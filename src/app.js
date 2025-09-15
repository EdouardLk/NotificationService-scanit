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

    // Middleware pour mesurer chaque requête
    const end = httpRequestDurationSeconds.startTimer();
    res.on('finish', () => {
      httpRequestsTotal.inc({ method: req.method, route: req.path, status: res.statusCode });
      end({ method: req.method, route: req.path, status: res.statusCode });
    });
    
    next();
});

app.get("/ping", (req, res) => {
    res.send("✅ Serveur Notifications fonctionne !");
});

// 🚏 Importer les routes
const emailRoutes = require('./routes/email.routes');
app.use('/api/email', emailRoutes);


//----------------partie metrics------------//
const client = require('prom-client');

// Crée un registre pour stocker toutes les métriques
const register = new client.Registry();

// Ajoute des métriques par défaut (CPU, mémoire, etc.)
client.collectDefaultMetrics({ register });

// Exemple : compteur personnalisé
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP reçues',
  labelNames: ['method', 'route', 'status']
});

// Exemple : histogramme pour les temps de réponse
const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durée des requêtes HTTP en secondes',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

// Enregistre les métriques
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDurationSeconds);


// Endpoint pour exposer les métriques
app.get('/api/metrics', async (req, res) => {

  //middleware
    if (req.query.token !== process.env.METRICS_TOKEN) return res.status(403).send("Forbidden");
    
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});


module.exports = app;