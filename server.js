const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Charger le fichier .env
dotenv.config();

// Initialisation de l'application Express
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Middleware pour vérifier le token JWT sur certaines routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Route de base pour vérifier que l'API fonctionne
app.get('/', (req, res) => {
  res.send('API en ligne et fonctionnelle');
});

// Routes API
const userRoutes = require('./routes/userRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
app.use('/api/users', userRoutes);
app.use('/api/tickets', authenticateToken, ticketRoutes); // Protéger les routes des tickets

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}`);
});

