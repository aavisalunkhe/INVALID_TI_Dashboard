const express = require('express');
const router = express.Router();
const gamesData = require('../data/games');

// Get all games
router.get('/', (req, res) => {
  res.json(gamesData);
});

// Get game by ID
router.get('/:id', (req, res) => {
  const game = gamesData.find(game => game.id === req.params.id);
  
  if (!game) {
    return res.status(404).json({ message: 'Game not found' });
  }
  
  res.json(game);
});

module.exports = router;