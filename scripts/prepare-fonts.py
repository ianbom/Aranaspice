from pathlib import Path
from urllib.request import urlopen
from fontTools import subset
import tempfile

root = Path(__file__).resolve().parent.parent
output = root / 'public' / 'fonts'
output.mkdir(parents=True, exist_ok=True)
text = ''.join(path.read_text(encoding='utf-8') for path in (root / 'src').rglob('*') if path.suffix in ['.ts', '.tsx'])
codepoints = set(map(ord, text)) | set(range(32, 256)) | set(range(0x600, 0x700))
families = [
    ('plusjakartasans', 'PlusJakartaSans[wght].ttf', 'heading'),
    ('inter', 'Inter[opsz,wght].ttf', 'body'),
    ('notosansarabic', 'NotoSansArabic[wdth,wght].ttf', 'arabic'),
    ('notosanssc', 'NotoSansSC[wght].ttf', 'chinese'),
]
for family, filename, name in families:
    url = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/{filename}'
    temporary = Path(tempfile.gettempdir()) / filename
    if not temporary.exists():
        with urlopen(url.replace('[', '%5B').replace(']', '%5D')) as response:
            temporary.write_bytes(response.read())
    options = subset.Options()
    font = subset.load_font(str(temporary), options)
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=codepoints)
    subsetter.subset(font)
    subset.save_font(font, str(output / f'{name}.ttf'), options)
    with urlopen(f'https://raw.githubusercontent.com/google/fonts/main/ofl/{family}/OFL.txt') as response:
        (output / f'{name}-OFL.txt').write_bytes(response.read())
    print(name, (output / f'{name}.ttf').stat().st_size)
