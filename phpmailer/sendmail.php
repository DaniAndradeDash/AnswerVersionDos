<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'Exception.php';
require 'PHPMailer.php';
require 'SMTP.php';

// Cargar variables de entorno desde .env

function loadEnv( $filePath ) {
    if ( !file_exists( $filePath ) ) {
        return;
    }

    $lines = file( $filePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );
    foreach ( $lines as $line ) {
        if ( strpos( $line, '#' ) === 0 ) continue;
        // Ignorar comentarios
        if ( strpos( $line, '=' ) !== false ) {
            list( $name, $value ) = explode( '=', $line, 2 );
            $_ENV[ trim( $name ) ] = trim( $value );
        }
    }
}

// Cargar el archivo .env desde la raíz del proyecto
loadEnv( '../.env' );

header( 'Access-Control-Allow-Origin: *' );
header( 'Access-Control-Allow-Methods: POST, OPTIONS' );
header( 'Access-Control-Allow-Headers: Content-Type' );
header( 'Content-Type: application/json' );

// Manejar preflight requests
if ( $_SERVER[ 'REQUEST_METHOD' ] === 'OPTIONS' ) {
    http_response_code( 200 );
    exit();
}

if ( $_SERVER[ 'REQUEST_METHOD' ] === 'POST' ) {
    $data = json_decode( file_get_contents( 'php://input' ), true );

    // Validar que se recibieron los datos
    if ( !$data ) {
        echo json_encode( [ 'success' => false, 'error' => 'No se recibieron datos válidos' ] );
        exit();
    }

    // Sanitizar y validar datos de entrada
    $nombre = filter_var( trim( $data[ 'nombre' ] ?? '' ), FILTER_SANITIZE_STRING );
    $email = filter_var( trim( $data[ 'email' ] ?? '' ), FILTER_SANITIZE_EMAIL );
    $telefono = filter_var( trim( $data[ 'telefono' ] ?? '' ), FILTER_SANITIZE_STRING );
    $empresa = filter_var( trim( $data[ 'empresa' ] ?? '' ), FILTER_SANITIZE_STRING );
    $mensaje = filter_var( trim( $data[ 'mensaje' ] ?? '' ), FILTER_SANITIZE_STRING );

    // Validaciones
    if ( empty( $nombre ) || empty( $email ) || empty( $mensaje ) ) {
        echo json_encode( [ 'success' => false, 'error' => 'Nombre, email y mensaje son obligatorios' ] );
        exit();
    }

    if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
        echo json_encode( [ 'success' => false, 'error' => 'Email no válido' ] );
        exit();
    }

    $mail = new PHPMailer( true );

    try {
        // Configuración SMTP de Neubox
        $mail->isSMTP();
        $mail->Host       = $_ENV[ 'SMTP_HOST' ] ?? 'mail.answerst.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV[ 'SMTP_USERNAME' ] ?? 'contacto@answerst.com';
        $mail->Password   = $_ENV[ 'SMTP_PASSWORD' ] ?? 'Answer.st2025';

        $mail->SMTPSecure = $_ENV[ 'SMTP_SECURE' ] ?? 'ssl';

        $mail->Port       = intval( $_ENV[ 'SMTP_PORT' ] ?? 465 );

        // Remitente
        $mail->setFrom( 'contacto@answerst.com', 'Formulario Web' );

        // Destinatario ( tú )
        $mail->addAddress( 'contacto@answerst.com' );

        // Contenido
        $mail->isHTML( true );
        $mail->Subject = "Nuevo mensaje de $nombre";
        $mail->Body    = "
            <h2>Mensaje desde el sitio web</h2>
            <p><strong>Nombre:</strong> $nombre</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Teléfono:</strong> $telefono</p>
            <p><strong>Empresa:</strong> $empresa</p>
            <p><strong>Mensaje:</strong><br/>$mensaje</p>
        ";

        $mail->send();
        echo json_encode( [
            'success' => true,
            'message' => 'Correo enviado exitosamente'
        ] );
    } catch ( Exception $e ) {
        error_log( 'Error enviando correo: ' . $e->getMessage() );
        echo json_encode( [
            'success' => false,
            'error' => 'Error al enviar el correo. Por favor intenta nuevamente.',
            'details' => $mail->ErrorInfo
        ] );
    }
} else {
    echo json_encode( [
        'success' => false,
        'error' => 'Método no permitido. Solo se acepta POST.'
    ] );
}