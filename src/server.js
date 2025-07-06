
const app = require("./app");

const PORT = process.env.PORT || 8000; // Définition du port

// Création du serveur HTTP
const server = app.listen(PORT);


console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);


// Gestion des erreurs du serveur
server.on('error', (error) => {
    console.error('❌ Erreur du serveur:', error);
});
