const express = require('express');
const router = express.Router();
const qrcode = require('qrcode');

// Simule une base de données pour les billets
const tickets = [
  { id: 1, name: 'Offre Solo', price: 100 },
  { id: 2, name: 'Offre Duo', price: 180 },
  { id: 3, name: 'Offre Familiale', price: 320 }
];

// Route pour acheter un billet
router.post('/buy', async (req, res) => {
  const { offerId, userKey } = req.body;  // On récupère l'offre et une clé utilisateur
  const ticket = tickets.find(t => t.id === offerId);

  if (!ticket) {
    return res.status(404).json({ message: 'Offre non trouvée' });
  }

  // Générer une clé finale pour sécuriser le billet (concaténation)
  const finalKey = `${userKey}-${ticket.name}-${Date.now()}`;

  // Générer le QR code basé sur la clé finale
  try {
    const qrCodeUrl = await qrcode.toDataURL(finalKey);

    // Retourner les informations du billet avec le QR code
    res.json({
      message: `Billet acheté pour ${ticket.name}`,
      ticket,
      qrCodeUrl  // L'URL du QR code à afficher ou à scanner
    });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la génération du QR code' });
  }
});

module.exports = router;
