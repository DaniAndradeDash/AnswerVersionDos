<?php
// Script de debugging para identificar el problema
error_reporting( E_ALL );
ini_set( 'display_errors', 1 );

header( 'Content-Type: application/json' );
header( 'Access-Control-Allow-Origin: *' );
header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS' );
header( 'Access-Control-Allow-Headers: Content-Type' );

if ( $_SERVER[ 'REQUEST_METHOD' ] === 'OPTIONS' ) {
    http_response_code( 200 );
    exit();
}

$debug_info = [];

// 1. Verificar versión de PHP
$debug_info[ 'php_version' ] = phpversion();
$debug_info[ 'php_compatible' ] = version_compare( phpversion(), '7.4.0', '>=' );

// 2. Verificar si existe PHPMailer
$debug_info[ 'phpmailer_files' ] = [
    'Exception.php' => file_exists( 'Exception.php' ),
    'PHPMailer.php' => file_exists( 'PHPMailer.php' ),
    'SMTP.php' => file_exists( 'SMTP.php' )
];

// 3. Verificar si existe .env
$debug_info[ 'env_file_exists' ] = file_exists( '.env' );

// 4. Verificar extensiones necesarias
$debug_info[ 'extensions' ] = [
    'openssl' => extension_loaded( 'openssl' ),
    'sockets' => extension_loaded( 'sockets' ),
    'curl' => extension_loaded( 'curl' )
];

// 5. Intentar cargar PHPMailer
try {
    if ( file_exists( 'PHPMailer.php' ) ) {
        require 'PHPMailer.php';
        $debug_info[ 'phpmailer_load' ] = 'success';
    } else {
        $debug_info[ 'phpmailer_load' ] = 'file_not_found';
    }
} catch ( Exception $e ) {
    $debug_info[ 'phpmailer_load' ] = 'error: ' . $e->getMessage();
}

// 6. Verificar método de request
$debug_info[ 'request_method' ] = $_SERVER[ 'REQUEST_METHOD' ];

if ( $_SERVER[ 'REQUEST_METHOD' ] === 'POST' ) {
    $debug_info[ 'post_data' ] = file_get_contents( 'php://input' );
}

echo json_encode( [
    'success' => true,
    'message' => 'Debug script ejecutado correctamente',
    'debug_info' => $debug_info,
    'server_time' => date( 'Y-m-d H:i:s' )
], JSON_PRETTY_PRINT );
?>