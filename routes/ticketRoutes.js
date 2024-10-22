const express = require('express');
const router = express.Router();

// In-memory storage pour les billets (à remplacer par une base de données)
const tickets = [
  { id: 1, name: 'Offre Solo', price: 100 },
  { id: 2, name: 'Offre Duo', price: 180 },
  { id: 3, name: 'Offre Familiale', price: 320 }
];

// Route pour récupérer toutes les offres de billets
router.get('/', (req, res) => {
  res.json(tickets);
});

// Route pour acheter un billet (à améliorer avec une vraie logique de paiement)
router.post('/buy', (req, res) => {
  const { offerId } = req.body;
  const ticket = tickets.find(t => t.id === offerId);

  if (!ticket) {
    return res.status(404).json({ message: 'Offre non trouvée' });
  }

  res.json({ message: `Vous avez acheté un billet pour l'offre ${ticket.name}`, ticket });
});

module.exports = router;
