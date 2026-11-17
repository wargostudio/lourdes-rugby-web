"""
Pipeline de imágenes de Lourdes Rugby Club.

Toma las fotos originales (descargadas de lourdesrugbyclub.com) en /originals
y genera versiones WebP responsive en /src/assets/img + manifest.json, que el
build usa para escribir <img srcset width height> correctos.
También genera íconos, logo y la imagen Open Graph.

Uso (requiere Pillow):
    python3 tools/images.py
"""
import json
import os

from PIL import Image, ImageOps, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "originals")
DST = os.path.join(ROOT, "src", "assets", "img")

NAVY = (14, 31, 58)
PAPER = (246, 241, 231)

# slug: (archivo original, recorte relativo (x0,y0,x1,y1) o None, anchos)
IMAGES = {
    "pelota-en-alto":     ("2021_09_15251713_1635657106733467_25920123336392704_n.jpg", None, [480, 800]),
    "entrada-en-calor":   ("2021_09_11390243_918168101578591_6078487788010376397_n.jpg", None, [480, 800]),
    "barro":              ("2021_09_14499008_262761664124046_3107148838515769344_n.jpg", None, [480, 800]),
    "equipo-cesped":      ("2021_09_14714388_573340176185862_5466919216579870720_n.jpg", None, [480, 800]),
    "cinco-abrazados":    ("2021_09_17663361_1457058134364463_3085593084851912704_n-1.jpg", None, [480, 800, 1080]),
    "seis-en-la-tierra":  ("2021_09_19534118_139127883330938_5242958344498446336_n.jpg", None, [480, 800]),
    "tres-pelotas":       ("2021_09_30592818_181229419194966_8425795609260195840_n.jpg", None, [480, 800]),
    "ronda-encuentro":    ("2021_09_44729754_2051330508262339_3798808267329634304_n.jpg", None, [480, 800]),
    "equipo-encuentro":   ("2021_09_71931055_2604607962934588_576609053229187072_n.jpg", None, [480, 800]),
    "abrazo-en-la-tierra": ("2021_09_82729811_2739187889521464_53731385841030449_n.jpg", None, [480, 800]),
    "yo-quiero-mi-cancha": ("2021_12_Diseno-sin-titulo-2-1-1.png", None, [480, 1000]),
    "cuatro-abrazados":   ("2021_12_Diseno-sin-titulo-4-1.png", None, [480, 1000]),
    "entrenamiento":      ("2021_12_slider-1.png", None, [480, 1000]),
    "nene-pelota":        ("2021_12_sliderrr-1.png", None, [480, 1000]),
    "ronda-cerrada":      ("2021_12_valores-1-1.png", None, [480, 1000]),
    "ronda-abrazados":    ("2021_12_valores.png", None, [480, 1000]),
    "sonrisas":           ("2026_05_Lourdes-Rugby-Club-3-1.png", None, [800, 1500]),
    "charla-entrenador":  ("2022_05_png-1.png", None, [300]),
    "equipo-palos":       ("2022_05_png-10.png", None, [300]),
    "charla-ronda":       ("2022_05_png-11.png", None, [300]),
    "foto-grupal":        ("2022_05_png-12-e1653078862946.png", None, [300]),
    "espaldas-44-35":     ("2022_05_png-13.png", None, [300]),
    "espaldas-26-41":     ("2022_05_png-14.png", None, [300]),
    "ronda-tierra":       ("2022_05_png-15-e1653078811297.png", None, [300]),
    "espaldas-26":        ("2022_05_png-8.png", None, [300]),
    "ronda-amarilla":     ("2022_05_png-9.png", None, [300]),
}

# Bandas en duotono azul marino → papel (fotos en blanco y negro de baja luz)
DUOTONES = {
    "banda-entrenamiento": ("2026_05_slider-bw-2-1-2.jpg", [800, 1400, 2000]),
    "banda-ronda": ("2021_12_valores.png", [800, 1000]),
}

LOGO = "2021_10_logo-lourdes-rugby-01-1.png"


def open_rgb(path):
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, PAPER)
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert("RGB")


def crop_rel(im, box):
    if not box:
        return im
    w, h = im.size
    return im.crop((int(box[0] * w), int(box[1] * h), int(box[2] * w), int(box[3] * h)))


def save_widths(im, slug, widths, manifest, quality=80):
    w, h = im.size
    out = []
    for target in widths:
        tw = min(target, w)
        if out and tw == out[-1]:
            continue
        th = round(h * tw / w)
        im.resize((tw, th), Image.LANCZOS).save(os.path.join(DST, f"{slug}-{tw}.webp"), "WEBP", quality=quality, method=6)
        out.append(tw)
    manifest[slug] = {"w": w, "h": h, "widths": out}


def duotone(im, dark=NAVY, light=PAPER):
    g = ImageOps.autocontrast(im.convert("L"), cutoff=1)
    return ImageOps.colorize(g, black=dark, white=light)


def main():
    os.makedirs(DST, exist_ok=True)
    manifest = {}
    for slug, (fname, box, widths) in IMAGES.items():
        im = crop_rel(open_rgb(os.path.join(SRC, fname)), box)
        save_widths(im, slug, widths, manifest)
    for slug, (fname, widths) in DUOTONES.items():
        im = duotone(open_rgb(os.path.join(SRC, fname)))
        save_widths(im, slug, widths, manifest, quality=78)

    # Logo (rosa de Lourdes) — PNG con transparencia
    logo = Image.open(os.path.join(SRC, LOGO)).convert("RGBA")
    logo = logo.crop(logo.getbbox())
    for size in (96, 192, 512):
        l = logo.copy(); l.thumbnail((size, size), Image.LANCZOS)
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        canvas.paste(l, ((size - l.width) // 2, (size - l.height) // 2), l)
        canvas.save(os.path.join(DST, f"rosa-{size}.png"), optimize=True)
    # Favicon: rosa sobre fondo transparente
    for size, name in ((32, "favicon-32.png"), (192, "favicon-192.png")):
        l = logo.copy(); l.thumbnail((size, size), Image.LANCZOS)
        canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        canvas.paste(l, ((size - l.width) // 2, (size - l.height) // 2), l)
        canvas.save(os.path.join(ROOT, "src", "static", name), optimize=True)
    # Íconos de app (iOS / instalación): rosa sobre azul marino, porque iOS pinta de negro la transparencia
    for size, name in ((180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")):
        bg = Image.new("RGBA", (size, size), NAVY + (255,))
        pad = round(size * 0.16)
        l = logo.copy(); l.thumbnail((size - 2 * pad, size - 2 * pad), Image.LANCZOS)
        bg.paste(l, ((size - l.width) // 2, (size - l.height) // 2), l)
        bg.convert("RGB").save(os.path.join(DST, name), optimize=True)

    # Open Graph 1200x630: foto + degradé azul marino + rosa
    photo = open_rgb(os.path.join(SRC, IMAGES["cinco-abrazados"][0]))
    photo = ImageOps.fit(photo, (1200, 630), Image.LANCZOS, centering=(0.5, 0.45))
    # degradé horizontal: opaco a la izquierda, transparente desde x≈760
    ramp = Image.linear_gradient("L").rotate(-90, expand=True)  # 255 → 0 de izquierda a derecha
    grad = Image.new("L", (1200, 630), 0)
    grad.paste(ramp.resize((760, 630)).point(lambda v: int(v * 0.9)), (0, 0))
    navy = Image.new("RGB", (1200, 630), NAVY)
    og = Image.composite(navy, photo, grad)
    l = logo.copy(); l.thumbnail((300, 300), Image.LANCZOS)
    og.paste(l, (110, (630 - l.height) // 2), l)
    og.save(os.path.join(DST, "og-lourdes.jpg"), quality=86, optimize=True, progressive=True)

    with open(os.path.join(DST, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=1)
    print(f"OK — {len(manifest)} imágenes")


if __name__ == "__main__":
    main()
