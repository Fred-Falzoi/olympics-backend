const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// In-memory storage pour les utilisateurs (A remplacer par la base de données)
const users = [];

// Route d'inscription
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'Utilisateur déjà existant' });
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer un nouvel utilisateur
  const user = { name, email, password: hashedPassword };
  users.push(user);

  res.status(201).json({ message: 'Utilisateur créé avec succès', user });
});

// Route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Utilisateur non trouvé' });
  }

  // Vérifier le mot de passe
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Mot de passe incorrect' });
  }

  // Générer un token JWT
  const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Connexion réussie', token });
});

module.exports = router;
