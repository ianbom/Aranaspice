import base64
import json
import time
from pathlib import Path
from urllib.parse import urlparse, parse_qs

origin = 'http://localhost:3000'
assert 'العربية' == '\u0627\u0644\u0639\u0631\u0628\u064a\u0629', 'Run browser-harness with PYTHONUTF8=1; stdin must preserve Unicode.'
out = Path.cwd() / 'artifacts' / 'qa' / 'hero-navbar'
out.mkdir(parents=True, exist_ok=True)
results = []


def evaluate(expression):
    result = cdp('Runtime.evaluate', expression=expression, awaitPromise=True, returnByValue=True)
    if result.get('exceptionDetails'):
        raise RuntimeError(str(result['exceptionDetails']))
    return result.get('result', {}).get('value')


def navigate(path):
    goto_url(origin + path)
    wait_for_load()
    cdp("Page.bringToFront")
    for attempt in range(20):
        if evaluate('document.fonts.status') == 'loaded':
            break
        time.sleep(.1)
    time.sleep(.35)


def key(name, code):
    extra = {'code': 'Enter', 'text': '\r', 'unmodifiedText': '\r'} if name == 'Enter' else {}
    cdp('Input.dispatchKeyEvent', type='keyDown', key=name, windowsVirtualKeyCode=code, **extra)
    cdp('Input.dispatchKeyEvent', type='keyUp', key=name, windowsVirtualKeyCode=code)


def node(role, name):
    for attempt in range(25):
        nodes = cdp('Accessibility.getFullAXTree')['nodes']
        found = next((item for item in nodes if item.get('role', {}).get('value') == role and item.get('name', {}).get('value') == name), None)
        if found:
            return found
        time.sleep(.1)
    raise AssertionError((role, name, [item.get('name', {}).get('value') for item in nodes if item.get('role', {}).get('value') == role]))


def click_node(item):
    identity = item['backendDOMNodeId']
    cdp('DOM.scrollIntoViewIfNeeded', backendNodeId=identity)
    box = cdp('DOM.getBoxModel', backendNodeId=identity)['model']['content']
    click_at_xy(sum(box[0::2]) / 4, sum(box[1::2]) / 4)


def click(role, name):
    click_node(node(role, name))
    time.sleep(.15)


def capture(name, full=False):
    options = {'format': 'jpeg', 'quality': 78, 'captureBeyondViewport': True}
    dimensions = evaluate('({width:innerWidth,height:document.documentElement.scrollHeight,top:0})' if full else '({width:innerWidth,height:innerHeight,top:scrollY})')
    options['clip'] = {'x': 0, 'y': dimensions['top'], 'width': dimensions['width'], 'height': dimensions['height'], 'scale': 1}
    (out / f'{name}.jpg').write_bytes(base64.b64decode(cdp('Page.captureScreenshot', **options)['data']))


new_tab(origin + '/en')
cdp('Runtime.enable')
for locale in ['en', 'ar']:
    for width in [1440, 768, 390]:
        cdp('Emulation.setDeviceMetricsOverride', width=width, height=1000 if width == 1440 else 844, deviceScaleFactor=1, mobile=width == 390)
        for page, suffix in [('home', ''), ('product', '/products/turmeric-ground')]:
            navigate(f'/{locale}{suffix}')
            height = evaluate('document.documentElement.scrollHeight')
            for top in range(0, height, 700):
                evaluate(f'window.scrollTo({{top:{top},behavior:"instant"}})')
                time.sleep(.08)
            for attempt in range(30):
                if evaluate('[...document.images].every(image=>!image.getClientRects().length||(image.complete&&image.naturalWidth>0))'):
                    break
                time.sleep(.15)
            evaluate('window.scrollTo({top:0,behavior:"instant"})')
            time.sleep(.8)
            state = evaluate('({width:innerWidth,client:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,lang:document.documentElement.lang,dir:document.documentElement.dir,broken:[...document.images].filter(image=>image.getClientRects().length&&(!image.complete||image.naturalWidth===0)).map(image=>image.alt),h1:document.querySelector("h1").innerText})')
            assert state['scroll'] <= state['client'], state
            assert state['lang'] == locale
            assert state['dir'] == ('rtl' if locale == 'ar' else 'ltr')
            assert not state['broken'], state
            if page == 'home':
                hero = evaluate('({background:getComputedStyle(document.querySelector(".site-header")).backgroundColor,logo:getComputedStyle(document.querySelector(".brand")).backgroundColor,left:document.querySelector(".hero-content").getBoundingClientRect().left,width:document.querySelector(".hero-content").getBoundingClientRect().width,headingWidth:document.querySelector(".hero h1").clientWidth,headingScroll:document.querySelector(".hero h1").scrollWidth,image:document.querySelector(".hero-background").getAttribute("src"),copyBottom:document.querySelector(".hero-actions").getBoundingClientRect().bottom,footTop:document.querySelector(".hero-foot").getBoundingClientRect().top})')
                assert hero['background'] == 'rgba(0, 0, 0, 0)', hero
                assert hero['logo'] == 'rgba(0, 0, 0, 0)', hero
                assert hero['left'] < width / 4, hero
                assert hero['headingScroll'] <= hero['headingWidth'], hero
                assert hero['copyBottom'] < hero['footTop'], hero
                assert 'spices-hero' in hero['image'], hero
                if width == 1440:
                    assert hero['width'] <= width * .6, hero
                state['hero'] = hero
            capture(f'{locale}-{page}-{width}')
            if width in [1440, 390]:
                capture(f'{locale}-{page}-{width}-full', True)
            if page == 'home':
                evaluate('window.scrollTo({top:180,behavior:"instant"})')
                for attempt in range(20):
                    if evaluate('getComputedStyle(document.querySelector(".site-header")).backgroundColor') == 'rgb(32, 59, 42)':
                        break
                    time.sleep(.1)
                assert evaluate('getComputedStyle(document.querySelector(".site-header")).backgroundColor') == 'rgb(32, 59, 42)'
                if locale == 'en' and width in [1440, 390]:
                    capture(f'en-navbar-scrolled-{width}')
                evaluate('window.scrollTo({top:0,behavior:"instant"})')
                time.sleep(.25)
            else:
                assert evaluate('getComputedStyle(document.querySelector(".site-header")).backgroundColor') == 'rgb(32, 59, 42)'
            results.append({'page': f'/{locale}{suffix}', 'viewport': width, 'state': state})
            print('PASS visual integrity', locale, page, width)

cdp('Emulation.setDeviceMetricsOverride', width=390, height=844, deviceScaleFactor=1, mobile=True)
navigate('/en/products')
for name, count in [('Whole Spices10', 10), ('Ground Spices5', 5), ('Innovative Products1', 1), ('All products16', 16)]:
    candidates = cdp('Accessibility.getFullAXTree')['nodes']
    item = next(item for item in candidates if item.get('role', {}).get('value') == 'button' and item.get('name', {}).get('value', '').replace(' ', '').lower() == name.replace(' ', '').lower())
    click_node(item)
    time.sleep(.15)
    assert evaluate('document.querySelectorAll(".product-card").length') == count
results.append({'check': 'category filters', 'result': '10 / 5 / 1 / 16'})
evaluate('window.scrollTo({top:0,behavior:"instant"})')
click('button', 'Menu')
assert evaluate('!!document.querySelector("[role=dialog]")')
for index in range(12):
    key('Tab', 9)
    assert evaluate('!!document.activeElement.closest("[role=dialog]")')
key('Escape', 27)
time.sleep(.2)
assert not evaluate('!!document.querySelector("[role=dialog]")')
assert evaluate('document.activeElement.getAttribute("aria-label")') == 'Menu'
results.append({'check': 'mobile menu', 'result': 'focus trap, Escape, focus return'})
navigate('/ar/products')
click('button', 'القائمة')
for index in range(8):
    key('Tab', 9)
    assert evaluate('!!document.activeElement.closest("[role=dialog]")')
key('Escape', 27)
time.sleep(.2)
assert evaluate('document.activeElement.getAttribute("aria-label")') == 'القائمة'
assert evaluate('getComputedStyle(document.querySelector(".footer-contact a:nth-of-type(2) bdi")).direction') == 'ltr'
results.append({'check': 'Arabic mobile menu / contact direction', 'result': 'focus trap, Escape, focus return, LTR phone isolation'})

navigate('/en')
question = 'Where can you ship?'
click('button', question)
assert evaluate('document.querySelector(".faq-accordion [data-state=open][data-slot=accordion-content]").innerText.includes("11")')
key('Enter', 13)
time.sleep(.15)
assert evaluate('document.querySelector(".faq-accordion [data-slot=accordion-trigger]").getAttribute("aria-expanded")') == 'false'
results.append({'check': 'FAQ', 'result': 'pointer open, keyboard close'})

for locale in ['en', 'ar', 'zh']:
    navigate(f'/{locale}/products/turmeric-ground')
    initial_storage = evaluate('JSON.stringify(localStorage)')
    evaluate('window.__qaOpened=[];window.open=(...args)=>{window.__qaOpened.push(args);return null}')
    submit = next(item for item in cdp('Accessibility.getFullAXTree')['nodes'] if item.get('role', {}).get('value') == 'button' and ('WhatsApp' in item.get('name', {}).get('value', '')))
    click_node(submit)
    assert evaluate('document.querySelectorAll(".field-error").length') == 4
    assert evaluate('document.activeElement.name') == 'name'
    inputs = {'name': 'أحمد & 王 / Buyer', 'email': 'buyer@example.com', 'country': '中国 / المملكة العربية السعودية', 'company': 'A&B Export', 'quantity': '-2', 'unit': 'kg', 'message': 'توريد 姜黄 & 100%? #sample'}
    for field, value in inputs.items():
        document_id = cdp('DOM.getDocument')['root']['nodeId']
        field_id = cdp('DOM.querySelector', nodeId=document_id, selector=f'[name="{field}"]')['nodeId']
        cdp('DOM.focus', nodeId=field_id)
        cdp('Input.insertText', text=value)
    click_node(submit)
    assert evaluate('document.querySelectorAll(".field-error").length') == 1
    assert evaluate('document.activeElement.name') == 'quantity'
    cdp('Input.dispatchKeyEvent', type='keyDown', key='a', code='KeyA', windowsVirtualKeyCode=65, modifiers=2)
    cdp('Input.dispatchKeyEvent', type='keyUp', key='a', code='KeyA', windowsVirtualKeyCode=65, modifiers=2)
    cdp('Input.insertText', text='2.5')
    click_node(submit)
    assert evaluate('document.querySelectorAll(".field-error").length') == 0
    link = evaluate('document.querySelector(".wa-ready a").href')
    assert urlparse(link).netloc == 'wa.me'
    assert urlparse(link).path == '/628123381141'
    message = parse_qs(urlparse(link).query)['text'][0]
    for value in [inputs['name'], inputs['country'], inputs['message'], '2.5']:
        assert value in message, message
    assert evaluate('window.__qaOpened.length') == 1
    assert evaluate('document.querySelector("[name=name]").value') == inputs['name']
    assert evaluate('location.search') == ''
    assert evaluate('JSON.stringify(localStorage)') == initial_storage
    assert not evaluate('!!document.querySelector(".floating-whatsapp")')
    capture(f'{locale}-inquiry-390')
    results.append({'check': 'inquiry validation / Unicode / blocked popup / retained values', 'locale': locale, 'result': 'pass; no actual WhatsApp navigation'})

navigate('/en/contact')
evaluate('window.__qaOpened=[];window.open=(...args)=>{window.__qaOpened.push(args);return null}')
submit = node('button', 'Continue in WhatsApp')
click_node(submit)
assert evaluate('document.querySelectorAll(".field-error").length') == 4
for field, value in {'name': 'QA Buyer', 'email': 'not-an-email', 'country': 'Indonesia', 'message': 'Spice supply & packing inquiry'}.items():
    document_id = cdp('DOM.getDocument')['root']['nodeId']
    field_id = cdp('DOM.querySelector', nodeId=document_id, selector=f'[name="{field}"]')['nodeId']
    cdp('DOM.focus', nodeId=field_id)
    cdp('Input.insertText', text=value)
click_node(submit)
assert evaluate('document.querySelectorAll(".field-error").length') == 1
assert evaluate('document.activeElement.name') == 'email'
cdp('Input.dispatchKeyEvent', type='keyDown', key='a', code='KeyA', windowsVirtualKeyCode=65, modifiers=2)
cdp('Input.dispatchKeyEvent', type='keyUp', key='a', code='KeyA', windowsVirtualKeyCode=65, modifiers=2)
cdp('Input.insertText', text='buyer@example.com')
click_node(submit)
link = evaluate('document.querySelector(".wa-ready a").href')
assert '\nProduct:' not in parse_qs(urlparse(link).query)['text'][0]
assert evaluate('window.__qaOpened.length') == 1
assert not evaluate('!!document.querySelector(".floating-whatsapp")')
capture('en-contact-inquiry-390')
results.append({'check': 'general contact inquiry', 'result': 'required fields, email error, optional fields empty, manual fallback, no automatic product, floating button hidden'})
navigate('/en/products/long-pepper')
combo = node('combobox', 'Language')
cdp('DOM.focus', backendNodeId=combo['backendDOMNodeId'])
key('ArrowDown', 40)
key('Enter', 13)
time.sleep(.7)
assert evaluate('location.pathname') == '/id/products/long-pepper'
results.append({'check': 'language switcher', 'result': 'product context preserved en to id'})
for locale in ['id', 'zh']:
    for path in ['', '/products', '/products/spice-chocolate', '/about', '/sustainability', '/contact']:
        navigate(f'/{locale}{path}')
        assert evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth')
        assert evaluate('document.documentElement.lang') == locale
results.append({'check': 'Indonesian / Mandarin browser smoke', 'result': '6 pages each, locale and overflow pass'})
cdp('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
evaluate('sessionStorage.removeItem("aranaspice-intro")')
navigate('/en')
assert evaluate('getComputedStyle(document.querySelector(".boot-splash")).display') == 'none'
assert evaluate('getComputedStyle(document.documentElement).scrollBehavior') == 'auto'
results.append({'check': 'reduced motion', 'result': 'intro hidden, smooth scrolling disabled'})
cdp('Emulation.setEmulatedMedia', features=[])
(out / 'browser-qa.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print('PASS browser QA:', len(results), 'scenarios')
