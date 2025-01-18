export const OTP_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  <style>
    body {
      font-family: 'Helvetica', 'Arial', sans-serif;
      background-color: #f5f5f5;
      margin: 0;
      padding: 0;
      color: #333;
    }

    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .header {
      text-align: center;
      margin-bottom: 20px;
    }

    .header h1 {
      color: #333;
    }

    .content {
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 6px;
      margin-bottom: 20px;
    }

    .content p {
      line-height: 1.6;
      color: #555;
    }

    .otp {
      font-size: 24px;
      color: #1a73e8;
      background-color: #e8f0fe;
      padding: 10px;
      text-align: center;
      border-radius: 4px;
      margin: 20px 0;
    }

    .footer {
      text-align: center;
      color: #777;
      font-size: 14px;
    }

    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Welcome to Auth-sys!</h1>
    </div>
    <div class="content">
      <p>Hello {{name}},</p>
      <p>Thank you for signing up. Please use the following OTP to complete your verification:</p>
      <div class="otp">
        {{otp}}
      </div>
      <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>© 2025 constGaurav . All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
