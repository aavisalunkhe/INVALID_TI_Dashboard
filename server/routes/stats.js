const express = require('express');
const router = express.Router();
const pitchingData = require('../data/pitching');
const hittingData = require('../data/hitting');
const defensiveData = require('../data/defensive');
const trendsData = require('../data/trends');

// Get pitching stats
router.get('/pitching/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  const stats = pitchingData[gameId] || pitchingData.default;
  res.json(stats);
});

// Get hitting stats
router.get('/hitting/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  const stats = hittingData[gameId] || hittingData.default;
  res.json(stats);
});

// Get defensive stats
router.get('/defensive/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  const stats = defensiveData[gameId] || defensiveData.default;
  res.json(stats);
});

// Get trends stats
router.get('/trends/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  const stats = trendsData[gameId] || trendsData.default;
  res.json(stats);
});

module.exports = router;