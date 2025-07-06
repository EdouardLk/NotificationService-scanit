const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Charge les variables d'environnement depuis le fichier .env

const app = express();

// Sécurisation de l'application avec Helmet
//app.use(helmet());

// Autoriser les requêtes cross-origin (CORS)
app.use(cors({
    origin: [process.env.FRONTEND_URL , process.env.AUTH_SERVICE_URL],
    credentials: true
}));


// Middleware pour parser le JSON
app.use(express.json());

app.use((req, res, next) => {
    console.log(`📩 Requête reçue : ${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("✅ Serveur Express fonctionne !");
});

// 🚏 Importer les routes
const emailRoutes = require('./routes/email.routes');
app.use('/api/email', emailRoutes);


app.get("/api/ping", (req, res) => {
    res.json({message :"✅ Serveur d'Emailing fonctionne !"});
});


module.exports = app;