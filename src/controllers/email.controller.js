require('dotenv').config();
const nodemailer = require('nodemailer');
const verificationEmailTemplate = require('../templates/verificationEmail');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // ⚠️ Ne pas utiliser en prod avec des données sensibles
  }
});

exports.sendVerificationEmail = async (req, res) => {
  try {
    console.log('Tentative d\'envoi d\'email de vérification');
    console.log('Email destinataire:', req.body.email);
    console.log('Token reçu:', req.body.token);

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: req.body.email,
      subject: 'Vérification de votre compte ScanIt',
      html: verificationEmailTemplate(req.body.token, process.env.FRONTEND_URL)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès:', info.response);
    
    res.status(200).json({
      success: true,
      message: 'Email de vérification envoyé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi de l\'email de vérification'
    });
  }
};

exports.sendNewsletter = async (req, res) => {
  try {
    console.log('Tentative d\'envoi de newsletter');
    console.log('Emails destinataires:', req.body.emails);

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: Array.isArray(req.body.emails) ? req.body.emails : [req.body.emails],
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur d\'envoi de newsletter:', error);
        res.status(500).json(error);
      } else {
        console.log('Newsletter envoyée avec succès:', info.response);
        res.status(200).json(info.response);
      }
    });
  }
  catch (e) {
    console.error("Erreur dans sendNewsletter:", e);
    res.status(500).json({ error: e.message });
  }
}