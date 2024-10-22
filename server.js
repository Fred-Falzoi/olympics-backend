const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialisation de l'application Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route de base pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
  res.send('API en ligne et fonctionnelle');
});

// Routes API
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/users', userRoutes);
app.use('/api/tickets', ticketRoutes);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});
