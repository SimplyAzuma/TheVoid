<?php
// contact.php
// Basic email sender. Harden/expand as needed.

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo "Method not allowed";
  exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "" || $email === "") {
  http_response_code(400);
  echo "Missing required fields.";
  exit;
}

$to = "hello@void-games.com"; // <-- change if needed
$subject = "New Void Games inquiry";
$body =
  "Name: {$name}\n" .
  "Email: {$email}\n\n" .
  "Message:\n{$message}\n";

$headers = [];
$headers[] = "From: {$name} <{$email}>";
$headers[] = "Reply-To: {$email}";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

$ok = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($ok) {
  // Simple response. You can redirect to a thank-you page instead.
  echo "OK";
} else {
  http_response_code(500);
  echo "Failed to send.";
}
