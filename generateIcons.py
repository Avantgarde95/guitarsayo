import os

# Requires Pillow library.
from PIL import Image

image = Image.open('Icon.png')
iconSizes = [16, 32, 48, 128]
path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'app', 'image')

for size in iconSizes:
    image.resize((size, size), Image.ANTIALIAS).save(os.path.join(path, 'Icon%d.png') % size)

print('Generated the icons!')
