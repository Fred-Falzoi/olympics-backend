const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simule une base de données d'utilisateurs
const users = [
  { id: 1, email: 'user@example.com', password: 'password123', name: 'John Doe' }
];

// Route pour s'inscrire
router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'L\'email est déjà utilisé' });
  }

  const newUser = { id: users.length + 1, email, password, name };
  users.push(newUser);

  res.status(201).json({ message: 'Utilisateur inscrit avec succès', user: newUser });
});

// Route pour se connecter
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
  }

  // Générer un token JWT
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
