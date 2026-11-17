#!/bin/sh
# Compila y copia dist/ a una carpeta de vista previa local.
# (El lanzador de vista previa de la app no puede leer el Escritorio.)
# La carpeta se lee de .preview-dir (archivo local, no versionado).
cd "$(dirname "$0")/.." || exit 1
S="$(cat .preview-dir 2>/dev/null)"
[ -n "$S" ] || { echo "Falta .preview-dir con la ruta de la vista previa"; exit 1; }
node tools/build.mjs && mkdir -p "$S/tools" && rsync -a --delete dist/ "$S/dist/" && cp tools/router.php "$S/tools/"
