const express = require("express");
const router = express.Router();
const emailController = require("../controllers/email.controller");

// Définition des routes
router.post("/confirm", emailController.sendVerificationEmail);
router.post("/newsletter", emailController.sendNewsletter);


module.exports = router;
