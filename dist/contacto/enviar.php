<?php
/**
 * Lourdes Rugby Club — procesa el formulario de contacto.
 *
 * - Responde JSON si la petición viene por fetch (Accept: application/json),
 *   o redirige a /contacto/?estado=... si el navegador no tiene JavaScript.
 * - Protección: honeypot, tiempo mínimo de llenado, límite por IP, mismo origen,
 *   validación y saneamiento de todos los campos, sin inyección de cabeceras.
 * - En localhost no envía mail: guarda el mensaje en un log temporal.
 *
 * CONFIGURAR ANTES DE PUBLICAR (ver PENDIENTES.md):
 *   DESTINO   → casilla que recibe las consultas.
 *   REMITENTE → casilla del dominio lourdesrugbyclub.com (Hostinger la exige
 *               para que el mail no termine en spam).
 * Mientras DESTINO esté vacío, el formulario ofrece enviar el mensaje por WhatsApp.
 */
declare(strict_types=1);
date_default_timezone_set('America/Argentina/Cordoba');

const DESTINO   = '';                                // p. ej. 'contacto@lourdesrugbyclub.com'
const REMITENTE = 'no-reply@lourdesrugbyclub.com';   // debe existir en el hosting
const LIMITE    = 5;     // envíos por IP...
const VENTANA   = 600;   // ...cada 10 minutos

$wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');

function responder(bool $ok, string $msg, array $errores = [], int $code = 200): never {
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode(['ok' => $ok, 'message' => $msg, 'errors' => $errores], JSON_UNESCAPED_UNICODE);
    } else {
        header('Location: /contacto/?estado=' . ($ok ? 'enviado' : 'error') . '#formulario', true, 303);
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    responder(false, 'Método no permitido.', [], 405);
}

// Mismo origen (si el navegador lo informa)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '') {
    $reqHost = parse_url('http://' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST);
    if (parse_url($origin, PHP_URL_HOST) !== $reqHost) {
        responder(false, 'Origen no válido.', [], 403);
    }
}

// Honeypot: los bots lo completan, las personas no lo ven.
if (trim((string)($_POST['sitio_web'] ?? '')) !== '') {
    responder(true, 'Gracias por tu mensaje. Ha sido enviado.');
}

// Tiempo mínimo (el campo lo completa el JS al cargar la página).
$t = (int)($_POST['t'] ?? 0);
if ($t > 0 && (time() * 1000 - $t) < 3000) {
    responder(false, 'Por favor, revisá los datos e intentá nuevamente.', [], 429);
}

// Límite de envíos por IP
$ip = $_SERVER['REMOTE_ADDR'] ?? '0';
$rlFile = sys_get_temp_dir() . '/lrc_rl_' . hash('sha256', $ip);
$hits = array_filter(
    is_file($rlFile) ? (json_decode((string)file_get_contents($rlFile), true) ?: []) : [],
    fn($ts) => $ts > time() - VENTANA
);
if (count($hits) >= LIMITE) {
    responder(false, 'Recibimos varios mensajes seguidos. Probá en unos minutos.', [], 429);
}

// Saneamiento
$limpiar = fn(string $k, int $max) => mb_substr(trim(str_replace(["\r", "\n", "%0a", "%0d"], ' ', strip_tags((string)($_POST[$k] ?? '')))), 0, $max);
$nombre   = $limpiar('nombre', 120);
$telefono = $limpiar('telefono', 40);
$email    = filter_var(trim((string)($_POST['email'] ?? '')), FILTER_SANITIZE_EMAIL);
$motivo   = $limpiar('motivo', 40);
$mensaje  = mb_substr(trim(strip_tags((string)($_POST['mensaje'] ?? ''))), 0, 4000);
$acepto   = ($_POST['acepto'] ?? '') === 'si';

$errores = [];
if (mb_strlen($nombre) < 2)                     $errores['nombre']  = 'Ingresá tu nombre.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errores['email']   = 'Ingresá un email válido.';
if (mb_strlen($mensaje) < 10)                   $errores['mensaje'] = 'Contanos un poco más sobre tu consulta.';
if (!$acepto)                                   $errores['acepto']  = 'Necesitamos tu consentimiento para responderte.';
if ($errores) {
    responder(false, 'Revisá los campos marcados.', $errores, 422);
}

$motivos = [
    'voluntariado' => 'Voluntariado',
    'donacion'     => 'Donación',
    'inscripcion'  => 'Inscripción de un hijo/a',
    'empresa'      => 'Empresa, club o institución',
    'historia'     => 'Historia para compartir',
    'otra'         => 'Otra consulta',
];
$motivoTxt = $motivos[$motivo] ?? 'Otra consulta';

$asunto = 'Web — ' . $motivoTxt . ' — ' . $nombre;
$cuerpo = "Nuevo mensaje desde lourdesrugbyclub.com\n"
        . str_repeat('-', 48) . "\n"
        . "Nombre:    $nombre\n"
        . "Email:     $email\n"
        . "Teléfono:  " . ($telefono ?: '—') . "\n"
        . "Motivo:    $motivoTxt\n"
        . str_repeat('-', 48) . "\n\n"
        . $mensaje . "\n\n"
        . str_repeat('-', 48) . "\n"
        . 'Enviado: ' . date('d/m/Y H:i') . " · IP $ip\n";

$headers = [
    'From: Lourdes Rugby Club Web <' . REMITENTE . '>',
    'Reply-To: ' . $nombre . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: LourdesRugbyClub',
];

$local = in_array(parse_url('http://' . ($_SERVER['HTTP_HOST'] ?? ''), PHP_URL_HOST), ['localhost', '127.0.0.1'], true);
if ($local) {
    file_put_contents(sys_get_temp_dir() . '/lrc-contacto.log', "== $asunto\n$cuerpo\n", FILE_APPEND);
    $enviado = true;
} elseif (DESTINO === '') {
    responder(false, 'El envío por email todavía no está disponible.', [], 503);
} else {
    $enviado = mail(DESTINO, '=?UTF-8?B?' . base64_encode($asunto) . '?=', $cuerpo, implode("\r\n", $headers), '-f' . REMITENTE);
}

if (!$enviado) {
    responder(false, 'Hubo un error al enviar tu mensaje.', [], 500);
}

$hits[] = time();
@file_put_contents($rlFile, json_encode(array_values($hits)));

responder(true, 'Gracias por tu mensaje. Ya lo recibimos y te vamos a responder a la brevedad.');
