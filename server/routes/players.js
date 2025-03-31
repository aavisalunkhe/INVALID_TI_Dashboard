const express = require('express');
const router = express.Router();

// Get all players
router.get('/', (req, res) => {
  // Combine players from hitting, pitching, and defensive data
  const hittingData = require('../data/hitting').default;
  const pitchingData = require('../data/pitching').default;
  const defensiveData = require('../data/defensive').default;

  const players = [
    ...hittingData.batters,
    ...pitchingData.pitchers,
    ...defensiveData.players
  ];

  res.json(players);
});

module.exports = router; 