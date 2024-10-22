const pool = require('../config/db');

exports.getOffers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM offers');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des offres' });
  }
};

