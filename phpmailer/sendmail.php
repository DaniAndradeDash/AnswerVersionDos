<?php
/**
 * AnswerST — Production Contact Form Handler
 * 
 * Security measures:
 * - Honeypot anti-spam
 * - Server-side input validation
 * - HTML sanitization (htmlspecialchars)
 * - File-based rate limiting (5 requests/hour per IP)
 * - CSRF token verification
 * - HTML email with professional template
 * - No sensitive data in logs or responses
 * 
 * Expected JSON response:
 * { "success": true, "message": "..." }
 * { "success": false, "message": "..." }
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

// ============================================
// Helpers
// ============================================

/**
 * Load environment variables from .env file
 */
function loadEnv(string $filePath): void
{
    if (!file_exists($filePath)) {
        return;
    }

    $lines = file($filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        // Skip comments and empty lines
        if (str_starts_with(trim($line), '#') || trim($line) === '') {
            continue;
        }
        if (strpos($line, '=') !== false) {
            [$name, $value] = explode('=', $line, 2);
            $_ENV[trim($name)] = trim($value);
        }
    }
}

/**
 * Sanitize string for safe HTML display
 */
function sanitize(string $value): string
{
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

/**
 * Get client IP address (handles proxies)
 */
function getClientIp(): string
{
    $headers = [
        'HTTP_CF_CONNECTING_IP',    // Cloudflare
        'HTTP_X_FORWARDED_FOR',     // Proxy
        'HTTP_X_REAL_IP',           // Nginx
        'REMOTE_ADDR',              // Direct
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

/**
 * File-based rate limiting
 * Stores IP + timestamp in a JSON file
 * Returns: true if allowed, false if rate limited
 */
function checkRateLimit(string $ip, int $maxRequests = 5, int $windowSeconds = 3600): array
{
    $rateDir = sys_get_temp_dir() . '/answerst_rate_limit';
    if (!is_dir($rateDir)) {
        @mkdir($rateDir, 0755, true);
    }

    $ipHash = hash('sha256', $ip);
    $rateFile = $rateDir . '/' . $ipHash . '.json';
    $now = time();

    // Read existing data
    $data = ['timestamps' => []];
    if (file_exists($rateFile)) {
        $content = file_get_contents($rateFile);
        $decoded = json_decode($content, true);
        if (is_array($decoded) && isset($decoded['timestamps'])) {
            $data = $decoded;
        }
    }

    // Remove timestamps outside the window
    $data['timestamps'] = array_values(array_filter(
        $data['timestamps'],
        fn($ts) => ($now - $ts) < $windowSeconds
    ));

    // Check if rate limited
    if (count($data['timestamps']) >= $maxRequests) {
        $oldest = min($data['timestamps']);
        $retryAfter = $windowSeconds - ($now - $oldest);
        file_put_contents($rateFile, json_encode($data));
        return [
            'allowed' => false,
            'retryAfter' => max($retryAfter, 1),
        ];
    }

    // Add current timestamp
    $data['timestamps'][] = $now;
    file_put_contents($rateFile, json_encode($data));

    return ['allowed' => true];
}

/**
 * Generate a simple CSRF token
 */
function generateCsrfToken(): string
{
    if (empty($_SESSION)) {
        @session_start();
    }

    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_time'] = time();
    }

    return $_SESSION['csrf_token'];
}

/**
 * Validate CSRF token
 */
function validateCsrfToken(string $token): bool
{
    if (empty($_SESSION)) {
        @session_start();
    }

    if (empty($_SESSION['csrf_token']) || empty($_SESSION['csrf_time'])) {
        return false;
    }

    // Token expires after 30 minutes
    if ((time() - $_SESSION['csrf_time']) > 1800) {
        unset($_SESSION['csrf_token'], $_SESSION['csrf_time']);
        return false;
    }

    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Build professional HTML email
 */
function buildEmailHTML(array $data): string
{
    $nombre = sanitize($data['nombre']);
    $email = sanitize($data['email']);
    $telefono = !empty($data['telefono']) ? sanitize($data['telefono']) : 'No proporcionado';
    $empresa = !empty($data['empresa']) ? sanitize($data['empresa']) : 'No especificada';
    $mensaje = nl2br(sanitize($data['mensaje']));

    $timestamp = date('l, j \d\e F \d\e Y, g:i A', time());

    return <<<HTML
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #04268c; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                Answer<span style="color: #31bf2c;">ST</span>
              </h1>
              <p style="margin: 8px 0 0; color: #93c5fd; font-size: 14px;">
                Nuevo mensaje desde el sitio web
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding: 32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Nombre</span>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #0f172a; font-weight: 500;">{$nombre}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                    <p style="margin: 4px 0 0; font-size: 16px;">
                      <a href="mailto:{$email}" style="color: #2563eb; text-decoration: none;">{$email}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Teléfono</span>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #0f172a;">{$telefono}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Empresa</span>
                    <p style="margin: 4px 0 0; font-size: 16px; color: #0f172a;">{$empresa}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 0;">
                    <span style="font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje</span>
                    <div style="margin: 8px 0 0; padding: 16px; background-color: #f1f5f9; border-radius: 8px; font-size: 15px; color: #334155; line-height: 1.6;">{$mensaje}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                Enviado el {$timestamp}
              </p>
              <p style="margin: 8px 0 0; font-size: 11px; color: #cbd5e1;">
                Este correo fue enviado desde el formulario de contacto de AnswerST. 
                Si no esperabas este mensaje, puedes ignorarlo de forma segura.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
HTML;
}

/**
 * Send JSON response and exit
 */
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

// Load environment variables
loadEnv(__DIR__ . '/../.env');

// Security headers
header('Access-Control-Allow-Origin: ' . ($_ENV['ALLOWED_ORIGIN'] ?? '*'));
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-CSRF-Token');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(false, 'Método no permitido', [], 405);
}

// Parse JSON body
$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

if (!$data || !is_array($data)) {
    jsonResponse(false, 'No se recibieron datos válidos', [], 400);
}

// -------------------------------------------
// Honeypot check (anti-spam)
// -------------------------------------------
$honeypot = trim($data['honeypot'] ?? '');
if ($honeypot !== '') {
    error_log('[AnswerST] Honeypot triggered from IP: ' . getClientIp());
    // Return success to confuse bots
    jsonResponse(true, 'Mensaje enviado correctamente');
}

// -------------------------------------------
// CSRF token validation (if provided)
// -------------------------------------------
$csrfToken = $data['csrf_token'] ?? '';
if ($csrfToken !== '' && !validateCsrfToken($csrfToken)) {
    error_log('[AnswerST] Invalid CSRF token from IP: ' . getClientIp());
    jsonResponse(false, 'Sesión expirada. Recarga la página e intenta de nuevo.', [], 403);
}

// -------------------------------------------
// Rate limiting
// -------------------------------------------
$clientIp = getClientIp();
$rateLimit = checkRateLimit($clientIp);

if (!$rateLimit['allowed']) {
    error_log('[AnswerST] Rate limit exceeded for IP: ' . $clientIp);
    jsonResponse(
        false,
        'Demasiados intentos. Inténtalo de nuevo en ' . $rateLimit['retryAfter'] . ' segundos.',
        ['retryAfter' => $rateLimit['retryAfter']],
        429
    );
}

// -------------------------------------------
// Input extraction and sanitization
// -------------------------------------------
$nombre = trim($data['nombre'] ?? '');
$email = trim($data['email'] ?? '');
$telefono = trim($data['telefono'] ?? '');
$empresa = trim($data['empresa'] ?? '');
$mensaje = trim($data['mensaje'] ?? '');

// -------------------------------------------
// Server-side validation
// -------------------------------------------
$errors = [];

// Nombre
if (empty($nombre)) {
    $errors['nombre'] = 'El nombre es obligatorio';
} elseif (strlen($nombre) < 2) {
    $errors['nombre'] = 'El nombre debe tener al menos 2 caracteres';
} elseif (strlen($nombre) > 100) {
    $errors['nombre'] = 'El nombre no puede exceder 100 caracteres';
}

// Email
if (empty($email)) {
    $errors['email'] = 'El email es obligatorio';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Ingresa un email válido';
}

// Teléfono (optional, but validate format if provided)
if ($telefono !== '') {
    if (!preg_match('/^[\d\s\-\(\)\+\.]+$/', $telefono)) {
        $errors['telefono'] = 'El teléfono solo puede contener números, espacios, guiones y paréntesis';
    } elseif (strlen($telefono) > 20) {
        $errors['telefono'] = 'Teléfono demasiado largo';
    }
}

// Empresa (optional)
if ($empresa !== '' && strlen($empresa) > 150) {
    $errors['empresa'] = 'El nombre de la empresa no puede exceder 150 caracteres';
}

// Mensaje
if (empty($mensaje)) {
    $errors['mensaje'] = 'El mensaje es obligatorio';
} elseif (strlen($mensaje) < 10) {
    $errors['mensaje'] = 'El mensaje debe tener al menos 10 caracteres';
} elseif (strlen($mensaje) > 2000) {
    $errors['mensaje'] = 'El mensaje no puede exceder 2000 caracteres';
}

if (!empty($errors)) {
    jsonResponse(false, 'Datos inválidos', ['errors' => $errors], 400);
}

// -------------------------------------------
// Send email via PHPMailer + SMTP
// -------------------------------------------
try {
    $mail = new PHPMailer(true);

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'] ?? 'mail.answerst.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['SMTP_USERNAME'] ?? 'contacto@answerst.com';
    $mail->Password   = $_ENV['SMTP_PASSWORD'] ?? '';
    $mail->SMTPSecure = $_ENV['SMTP_SECURE'] ?? 'ssl';
    $mail->Port       = intval($_ENV['SMTP_PORT'] ?? 465);

    // Timeouts
    $mail->Timeout = 15;
    $mail->SMTPKeepAlive = false;

    // Sender
    $mail->setFrom('contacto@answerst.com', 'Formulario Web AnswerST');

    // Recipient
    $mail->addAddress('contacto@answerst.com', 'AnswerST');

    // Reply to the sender
    $mail->addReplyTo($email, $nombre);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "Nuevo mensaje de {$nombre} desde AnswerST";
    $mail->Body    = buildEmailHTML([
        'nombre'  => $nombre,
        'email'   => $email,
        'telefono' => $telefono,
        'empresa' => $empresa,
        'mensaje' => $mensaje,
    ]);
    $mail->AltBody = "Nuevo mensaje desde el sitio web AnswerST\n\n"
        . "Nombre: {$nombre}\n"
        . "Email: {$email}\n"
        . "Teléfono: {$telefono}\n"
        . "Empresa: {$empresa}\n\n"
        . "Mensaje:\n{$mensaje}";

    $mail->send();

    error_log('[AnswerST] Email sent successfully from: ' . $email);

    jsonResponse(true, 'Correo enviado correctamente');

} catch (Exception $e) {
    // Log internally but don't expose details to client
    error_log('[AnswerST] Email error: ' . $e->getMessage());

    jsonResponse(
        false,
        'Error al enviar el mensaje. Por favor intenta de nuevo más tarde.',
        [],
        500
    );
}
