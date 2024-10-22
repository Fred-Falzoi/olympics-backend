const express = require('express');
const router = express.Router();
const { getOffers } = require('../controllers/offerController');

// Récupérer toutes les offres
router.get('/', getOffers);

module.exports = router;

