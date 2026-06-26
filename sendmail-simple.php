<?php
/**
 * AnswerST — Fallback Contact Form Handler (PHP mail())
 *
 * This is a fallback script that uses PHP's native mail() function.
 * It should only be used when PHPMailer is not available.
 *
 * Security: Same measures as sendmail.php but with simpler email sending.
 */

error_reporting(0);
ini_set('display_errors', 0);

// ============================================
// Helpers
// ============================================

function sanitize(string $value): string
{
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

function getClientIp(): string
{
    $headers = [
        'HTTP_CF_CONNECTING_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_REAL_IP',
        'REMOTE_ADDR',
    ];

    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ips = explode(',', $_SERVER[$header]);
            $ip = trim($ips[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP)) {
                return $ip;
            }
        }
    }

    return '0.0.0.0';
}

function checkRateLimit(string $ip, int $maxRequests = 5, int $windowSeconds = 3600): array
{
    $rateDir = sys_get_temp_dir() . '/answerst_rate_limit';
    if (!is_dir($rateDir)) {
        @mkdir($rateDir, 0755, true);
    }

    $ipHash = hash('sha256', $ip);
    $rateFile = $rateDir . '/' . $ipHash . '.json';
    $now = time();

    $data = ['timestamps' => []];
    if (file_exists($rateFile)) {
        $content = file_get_contents($rateFile);
        $decoded = json_decode($content, true);
        if (is_array($decoded) && isset($decoded['timestamps'])) {
            $data = $decoded;
        }
    }

    $data['timestamps'] = array_values(array_filter(
        $data['timestamps'],
        fn($ts) => ($now - $ts) < $windowSeconds
    ));

    if (count($data['timestamps']) >= $maxRequests) {
        $oldest = min($data['timestamps']);
        $retryAfter = max($windowSeconds - ($now - $oldest), 1);
        file_put_contents($rateFile, json_encode($data));
        return ['allowed' => false, 'retryAfter' => $retryAfter];
    }

    $data['timestamps'][] = $now;
    file_put_contents($rateFile, json_encode($data));
    return ['allowed' => true];
}

function jsonResponse(bool $success, string $message, array $extra = [], int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(array_merge([
        'success' => $success,
        'message' => $message,
    ], $extra), JSON_UNESCAPED_UNICODE);
    exit;
}

// ============================================
// Main Handler
// ============================================

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Metodo no permitido', [], 405);
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

if (!$data || !is_array($data)) {
    jsonResponse(false, 'No se recibieron datos validos', [], 400);
}

// Honeypot check
$honeypot = trim($data['honeypot'] ?? '');
if ($honeypot !== '') {
    error_log('[AnswerST] Honeypot triggered from IP: ' . getClientIp());
    jsonResponse(true, 'Mensaje enviado correctamente');
}

// Rate limiting
$clientIp = getClientIp();
$rateLimit = checkRateLimit($clientIp);

if (!$rateLimit['allowed']) {
    jsonResponse(
        false,
        'Demasiados intentos. Intentalo de nuevo en ' . $rateLimit['retryAfter'] . ' segundos.',
        ['retryAfter' => $rateLimit['retryAfter']],
        429
    );
}

// Extract and sanitize
$nombre = trim($data['nombre'] ?? '');
$email = trim($data['email'] ?? '');
$telefono = trim($data['telefono'] ?? '');
$empresa = trim($data['empresa'] ?? '');
$mensaje = trim($data['mensaje'] ?? '');

// Validation
$errors = [];

if (empty($nombre) || strlen($nombre) < 2) {
    $errors['nombre'] = 'El nombre debe tener al menos 2 caracteres';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Ingresa un email valido';
}
if ($telefono !== '' && !preg_match('/^[\d\s\-\(\)\+\.]+$/', $telefono)) {
    $errors['telefono'] = 'Formato de telefono invalido';
}
if ($empresa !== '' && strlen($empresa) > 150) {
    $errors['empresa'] = 'Nombre de empresa demasiado largo';
}
if (empty($mensaje) || strlen($mensaje) < 10) {
    $errors['mensaje'] = 'El mensaje debe tener al menos 10 caracteres';
}
if (strlen($mensaje) > 2000) {
    $errors['mensaje'] = 'El mensaje no puede exceder 2000 caracteres';
}

if (!empty($errors)) {
    jsonResponse(false, 'Datos invalidos', ['errors' => $errors], 400);
}

// Build email
$to = 'contacto@answerst.com';
$subject = "Nuevo mensaje de {$nombre} desde AnswerST";

// Plain text body
$body = "Nuevo mensaje desde el sitio web AnswerST\n\n"
    . "Nombre: {$nombre}\n"
    . "Email: {$email}\n"
    . "Telefono: {$telefono}\n"
    . "Empresa: {$empresa}\n\n"
    . "Mensaje:\n{$mensaje}\n\n"
    . "---\nEnviado el " . date('Y-m-d H:i:s');

// Headers
$headers = "From: contacto@answerst.com\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= 'X-Mailer: PHP/' . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $body, $headers)) {
    error_log('[AnswerST] Email sent via mail() from: ' . $email);
    jsonResponse(true, 'Correo enviado correctamente');
} else {
    error_log('[AnswerST] mail() failed for IP: ' . $clientIp);
    jsonResponse(false, 'Error al enviar el mensaje. Intenta de nuevo mas tarde.', [], 500);
}
