<?php
header('Content-Type: application/json; charset=utf-8');

function sendContactEmail(array $data): array {
    $to = getenv('STELLAR_CONTACT_TO') ?: 'sarath@stellaragents.in';
    $from = getenv('STELLAR_CONTACT_FROM') ?: 'no-reply@stellaragents.in';
    $replyTo = trim((string)($data['email'] ?? '')) ?: $from;
    $subject = 'New contact enquiry from Stellar Agents';

    $lines = [];
    $lines[] = 'Name: ' . ($data['name'] ?? '');
    $lines[] = 'Email: ' . ($data['email'] ?? '');
    $lines[] = 'Company: ' . ($data['company'] ?? '');
    $lines[] = 'Phone: ' . ($data['phone'] ?? '');
    $lines[] = 'Interest: ' . ($data['interest'] ?? '');
    $lines[] = 'Source: ' . ($data['source'] ?? '');
    $lines[] = 'Submitted At: ' . ($data['submittedAt'] ?? '');
    $lines[] = '';
    $lines[] = 'Message:';
    $lines[] = (string)($data['message'] ?? '');
    $message = implode(PHP_EOL, $lines);

    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
        require_once __DIR__ . '/vendor/autoload.php';
        if (class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
            $mail = new PHPMailer\PHPMailer\PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = getenv('SMTP_HOST') ?: 'smtp.hostinger.com';
            $mail->Port = (int)(getenv('SMTP_PORT') ?: 465);
            $mail->SMTPSecure = getenv('SMTP_SECURE') ?: 'ssl';
            $mail->SMTPAuth = true;
            $mail->Username = getenv('SMTP_USERNAME') ?: '';
            $mail->Password = getenv('SMTP_PASSWORD') ?: '';
            $mail->setFrom($from, 'Stellar Agents');
            $mail->addAddress($to);
            $mail->addReplyTo($replyTo, $data['name'] ?? '');
            $mail->Subject = $subject;
            $mail->Body = $message;
            $mail->AltBody = $message;
            $mail->send();
            return ['ok' => true, 'provider' => 'phpmailer'];
        }
    }

    $headers = [];
    $headers[] = 'From: ' . $from;
    $headers[] = 'Reply-To: ' . $replyTo;
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';

    $sent = mail($to, $subject, $message, implode("\r\n", $headers));
    return ['ok' => $sent, 'provider' => 'mail'];
}

$rawBody = file_get_contents('php://input');
$data = [];

if ($rawBody !== '') {
    $decoded = json_decode($rawBody, true);
    if (is_array($decoded)) {
        $data = $decoded;
    } else {
        parse_str($rawBody, $data);
    }
}

if (empty($data)) {
    $data = $_POST;
}

foreach (['name', 'email', 'message'] as $required) {
    if (empty(trim((string)($data[$required] ?? '')))) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'message' => 'Name, email and message are required.']);
        exit;
    }
}

$result = sendContactEmail($data);

if (!empty($result['ok'])) {
    http_response_code(200);
    echo json_encode(['ok' => true, 'message' => 'Contact submission delivered successfully.']);
} else {
    http_response_code(500);
    echo json_encode(['ok' => false, 'message' => 'Unable to deliver the contact submission. Configure SMTP credentials on the server.']);
}
