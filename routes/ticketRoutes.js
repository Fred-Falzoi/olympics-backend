const express = require('express');
const router = express.Router();

// Simule une base de données pour les billets
const tickets = [
  { id: 1, name: 'Offre Solo', price: 100 },
  { id: 2, name: 'Offre Duo', price: 180 },
  { id: 3, name: 'Offre Familiale', price: 320 }
];

// Route pour afficher les billets disponibles
router.get('/', (req, res) => {
  res.json(tickets);
});

// Route pour acheter un billet
router.post('/buy', (req, res) => {
  const { offerId } = req.body;
  const ticket = tickets.find(t => t.id === offerId);

  if (!ticket) {
    return res.status(404).json({ message: 'Offre non trouvée' });
  }

  res.json({ message: `Billet acheté pour ${ticket.name}`, ticket });
});

module.exports = router;
