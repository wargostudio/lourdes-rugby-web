<?php
// Router del servidor de desarrollo (php -S): sirve archivos de /dist y
// devuelve 404.html para rutas inexistentes, como hará el .htaccess en producción.
$path = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));
$file = __DIR__ . '/../dist' . $path;
if (is_dir($file) && substr($path, -1) !== '/') { header('Location: ' . $path . '/', true, 301); return true; }
if (is_file($file) || is_file(rtrim($file, '/') . '/index.html')) return false;
http_response_code(404);
readfile(__DIR__ . '/../dist/404.html');
