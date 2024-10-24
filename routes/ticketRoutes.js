const express = require('express');
const crypto = require('crypto');
const QRCode = require('qrcode');
const router = express.Router();

// Simule une base de données pour les billets
const tickets = [
  { id: 1, name: 'Offre Solo', price: 100 },
  { id: 2, name: 'Offre Duo', price: 180 },
  { id: 3, name: 'Offre Familiale', price: 320 }
];

// Route pour obtenir les offres disponibles
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

  // Générer une clef unique pour l'achat
  const purchaseKey = crypto.randomBytes(16).toString('hex');
  const finalKey = req.user.jwtToken + purchaseKey; // Concaténation avec le token utilisateur

  // Générer le QR Code basé sur la clef finale
  QRCode.toDataURL(finalKey, (err, url) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la génération du QR Code' });
    }

    // Retourner les informations d'achat et le QR Code
    res.json({ 
      message: `Billet acheté pour ${ticket.name}`, 
      finalKey, 
      qrCode: url 
    });
  });
});

module.exports = router;
