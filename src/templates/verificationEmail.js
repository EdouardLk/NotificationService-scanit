const verificationEmailTemplate = (token, frontendUrl) => {
  const verificationUrl = `${frontendUrl}/auth/verify/${token}`;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vérifiez votre email - ScanIt</title>
        <style>
          body { 
            margin: 0;
            padding: 0;
            background-color: #f9fafb;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }
          .main-container {
            background-color: #f9fafb;
            padding: 40px 20px;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .logo {
            font-size: 32px;
            font-weight: bold;
            color: #1B4B43;
            text-align: center;
            margin-bottom: 10px;
          }
          .tagline {
            font-size: 16px;
            color: #666;
            text-align: center;
            margin-bottom: 40px;
          }
          .content {
            margin-bottom: 30px;
            line-height: 1.6;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #1B4B43;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            color: #666;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="main-container">
          <div class="email-container">
            <div class="logo">SCAN.IT</div>
            <div class="tagline">Votre job commence ici</div>
            <div class="content">
              <p>Bonjour,</p>
              <p>Merci de vous être inscrit sur ScanIt. Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
              <div style="text-align: center;">
                <a href="${verificationUrl}" class="button" style="color: white !important; font-weight: bold;">Vérifier mon email</a>
              </div>
              <p>Si le bouton ne fonctionne pas, vous pouvez copier et coller le lien suivant dans votre navigateur :</p>
              <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
            </div>
            <div class="footer">
              <p>© 2024 ScanIt. Tous droits réservés.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = verificationEmailTemplate; 