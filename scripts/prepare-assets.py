from pathlib import Path
from PIL import Image, ImageOps
import json
import shutil
import urllib.request
import zipfile
import io

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'images'
OUT.mkdir(parents=True, exist_ok=True)
Image.MAX_IMAGE_PIXELS = 100_000_000


def save(source, name, width=1400, crop=None):
    image = Image.open(ROOT / source)
    image = ImageOps.exif_transpose(image)
    if crop:
        image = image.crop(tuple(round(value * dimension) for value, dimension in zip(crop, [image.width, image.height] * 2)))
    if image.mode == 'RGBA':
        image = image.crop(image.getbbox())
    image.thumbnail((width, width))
    image.save(OUT / f'{name}.webp', 'WEBP', quality=85, method=6)


mapping = {
    'dried-sliced-turmeric': 'Whole Spices/Turmeric.png',
    'dried-sliced-ginger': 'Whole Spices/White Ginger.png',
    'dried-sliced-galangal': 'Whole Spices/Dried Galangal.png',
    'dried-sliced-curcuma': 'Whole Spices/Dried Curcuma.png',
    'mace': 'Whole Spices/Papua Mace.png',
    'nutmeg': 'Whole Spices/Nutmeg.png',
    'long-pepper': 'Whole Spices/Long Pepper.png',
    'cubeb': 'Whole Spices/Cubeb.png',
    'clove': 'Whole Spices/Clove_PT. SBN.png',
    'candlenut': 'Whole Spices/Candlenut 1.png',
    'turmeric-ground': 'Ground Spices/Turmeric.png',
    'ginger-ground': 'Ground Spices/Ginger.png',
    'red-ginger-ground': 'Ground Spices/Red Ginger.png',
    'white-pepper-ground': 'Ground Spices/White Pepper.png',
    'ginger-composition': 'Ground Spices/1.png',
    'spice-collage': 'Untuk Design Website/All Spice 2.png',
    'spices-editorial': 'Untuk Design Website/DSCF1808OK.jpg',
    'spices-still-life': 'Untuk Design Website/DSCF1823OK.jpg',
    'ginger-editorial': 'Untuk Design Website/DSCF1787.jpg',
    'turmeric-editorial': 'Untuk Design Website/DSCF1835.jpg',
    'mace-editorial': 'Untuk Design Website/DSCF1846.jpg',
    'whole-editorial': 'Untuk Design Website/DSCF7069.jpg',
}
for name, source in mapping.items():
    save('FotoProduk/' + source, name, 1300 if 'editorial' in name else 1100)

save('hero-image.jpg', 'spices-hero', 1920)

save('Logo/Logo Aranaspice 1000x1000.png', 'aranaspice-logo', 600)
save('Compro/Compro SBN 2026_page-0007.jpg', 'spice-mix-powder', 1000, (0.012, 0.51, 0.425, 0.99))
save('Compro/Compro SBN 2026_page-0009.jpg', 'spice-chocolate', 1100, (0.535, 0, 1, 1))
save('Compro/Compro SBN 2026_page-0013.jpg', 'company-exhibition', 1000, (0.005, 0.005, 0.39, 0.66))
save('Compro/Compro SBN 2026_page-0013.jpg', 'business-forum', 1100, (0.405, 0.45, 0.99, 0.89))
save('Compro/Compro SBN 2026_page-0004.jpg', 'farmer-collaboration', 700, (0.31, 0.18, 0.49, 0.48))
save('Compro/Compro SBN 2026_page-0014.jpg', 'haccp-mark', 360, (0.06, 0.33, 0.18, 0.495))
save('Compro/Compro SBN 2026_page-0014.jpg', 'halal-mark', 360, (0.195, 0.31, 0.285, 0.495))

with zipfile.ZipFile(ROOT / 'WEBSITE BRIEF.docx') as archive:
    image = Image.open(io.BytesIO(archive.read('word/media/image2.png')))
    for index, goal in enumerate([4, 5, 6, 8, 12, 17]):
        column, row = index % 3, index // 3
        tile = image.crop((column * image.width // 3, row * image.height // 2, (column + 1) * image.width // 3, (row + 1) * image.height // 2))
        tile.save(OUT / f'sdg-{goal}.webp', 'WEBP', quality=95)

downloads = ROOT / 'public' / 'downloads'
downloads.mkdir(exist_ok=True)
shutil.copyfile(ROOT / 'Compro/Compro SBN 2026.pdf', downloads / 'aranaspice-company-profile-2026.pdf')
logo = Image.open(ROOT / 'Logo/Logo Aranaspice 1000x1000.png')
ImageOps.pad(logo.crop(logo.getbbox()), (192, 192), color=(248, 247, 242, 255)).save(ROOT / 'public' / 'icon.png')

url = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
with urllib.request.urlopen(url) as response:
    world = json.load(response)
paths = []
for feature in world['features']:
    if feature['properties'].get('ADMIN') == 'Antarctica':
        continue
    geometry = feature['geometry']
    polygons = geometry['coordinates'] if geometry['type'] == 'MultiPolygon' else [geometry['coordinates']]
    for polygon in polygons:
        for ring in polygon:
            commands = []
            for index, (longitude, latitude, *rest) in enumerate(ring):
                x, y = (longitude + 180) / 360 * 1000, (85 - latitude) / 145 * 480
                commands.append(f'{"M" if index == 0 else "L"}{x:.1f},{y:.1f}')
            paths.append(' '.join(commands) + 'Z')
(OUT / 'world.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 480"><g fill="#45664A" stroke="#203B2A" stroke-width="0.6">' + ''.join(f'<path d="{path}"/>' for path in paths) + '</g></svg>', encoding='utf-8')
print(f'Prepared {len(list(OUT.iterdir()))} images; original sources untouched.')
