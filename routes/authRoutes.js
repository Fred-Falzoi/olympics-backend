const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Inscription
router.post('/register', registerUser);

// Connexion
router.post('/login', loginUser);

module.exports = router;

