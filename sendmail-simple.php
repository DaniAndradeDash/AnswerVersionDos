<?php
// Versión simplificada sin PHPMailer para testing
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

header( 'Content-Type: application/json' );
header( 'Access-Control-Allow-Origin: *' );
header( 'Access-Control-Allow-Methods: POST, OPTIONS' );
header( 'Access-Control-Allow-Headers: Content-Type' );

if ( $_SERVER[ 'REQUEST_METHOD' ] === 'OPTIONS' ) {
    http_response_code( 200 );
    exit();
}

if ( $_SERVER[ 'REQUEST_METHOD' ] === 'POST' ) {
    $data = json_decode( file_get_contents( 'php://input' ), true );

    if ( !$data ) {
        echo json_encode( [ 'success' => false, 'error' => 'No se recibieron datos válidos' ] );
        exit();
    }

    $nombre = filter_var( trim( $data[ 'nombre' ] ?? '' ), FILTER_SANITIZE_STRING );
    $email = filter_var( trim( $data[ 'email' ] ?? '' ), FILTER_SANITIZE_EMAIL );
    $telefono = filter_var( trim( $data[ 'telefono' ] ?? '' ), FILTER_SANITIZE_STRING );
    $empresa = filter_var( trim( $data[ 'empresa' ] ?? '' ), FILTER_SANITIZE_STRING );
    $mensaje = filter_var( trim( $data[ 'mensaje' ] ?? '' ), FILTER_SANITIZE_STRING );

    if ( empty( $nombre ) || empty( $email ) || empty( $mensaje ) ) {
        echo json_encode( [ 'success' => false, 'error' => 'Nombre, email y mensaje son obligatorios' ] );
        exit();
    }

    if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
        echo json_encode( [ 'success' => false, 'error' => 'Email no válido' ] );
        exit();
    }

    // Usar mail() nativo de PHP en lugar de PHPMailer
    $to = 'contacto@answerst.com';
    $subject = "Nuevo mensaje de $nombre";
    $body = 'Mensaje desde el sitio web\n\n';
    $body .= "Nombre: $nombre\n";
    $body .= "Email: $email\n";
    $body .= "Teléfono: $telefono\n";
    $body .= "Empresa: $empresa\n";
    $body .= "Mensaje: $mensaje\n";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= 'X-Mailer: PHP/' . phpversion();

    if ( mail( $to, $subject, $body, $headers ) ) {
        echo json_encode( [
            'success' => true,
            'message' => 'Correo enviado exitosamente usando mail() nativo'
        ] );
    } else {
        echo json_encode( [
            'success' => false,
            'error' => 'Error al enviar correo con mail() nativo'
        ] );
    }

} else {
    echo json_encode( [
        'success' => false,
        'error' => 'Método no permitido. Solo se acepta POST.'
    ] );
}
?>