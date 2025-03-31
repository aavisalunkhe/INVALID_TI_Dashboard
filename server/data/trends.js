module.exports = {
    default: {
      seasonData: {
        runs: [
          { game: 1, yankees: 5, opponent: 2 },
          { game: 2, yankees: 3, opponent: 4 },
          { game: 3, yankees: 7, opponent: 1 },
          { game: 4, yankees: 2, opponent: 2 },
          { game: 5, yankees: 6, opponent: 3 },
          { game: 6, yankees: 4, opponent: 5 },
          { game: 7, yankees: 8, opponent: 2 },
          { game: 8, yankees: 5, opponent: 0 },
          { game: 9, yankees: 3, opponent: 3 },
          { game: 10, yankees: 6, opponent: 4 }
        ],
        batting: [
          { game: 1, avg: 0.265, league: 0.248 },
          { game: 2, avg: 0.258, league: 0.249 },
          { game: 3, avg: 0.272, league: 0.247 },
          { game: 4, avg: 0.268, league: 0.250 },
          { game: 5, avg: 0.275, league: 0.251 },
          { game: 6, avg: 0.270, league: 0.249 },
          { game: 7, avg: 0.282, league: 0.248 },
          { game: 8, avg: 0.278, league: 0.250 },
          { game: 9, avg: 0.275, league: 0.251 },
          { game: 10, avg: 0.280, league: 0.252 }
        ],
        pitching: [
          { game: 1, era: 3.45, league: 4.10 },
          { game: 2, era: 3.52, league: 4.08 },
          { game: 3, era: 3.38, league: 4.12 },
          { game: 4, era: 3.42, league: 4.09 },
          { game: 5, era: 3.35, league: 4.11 },
          { game: 6, era: 3.48, league: 4.10 },
          { game: 7, era: 3.30, league: 4.08 },
          { game: 8, era: 3.25, league: 4.09 },
          { game: 9, era: 3.28, league: 4.10 },
          { game: 10, era: 3.22, league: 4.11 }
        ]
      },
      comparativeData: [
        { metric: "Batting Avg", current: 0.280, historical: 0.265 },
        { metric: "OBP", current: 0.352, historical: 0.340 },
        { metric: "Slugging", current: 0.475, historical: 0.450 },
        { metric: "ERA", current: 3.22, historical: 3.65 },
        { metric: "WHIP", current: 1.15, historical: 1.22 },
        { metric: "K/9", current: 9.8, historical: 9.2 },
        { metric: "Fielding %", current: 0.988, historical: 0.982 },
        { metric: "Run Diff", current: 1.8, historical: 1.2 }
      ],
      winProbability: {
        home: 68,
        away: 32,
        factors: [
          "Yankees have a 2-run lead in the 7th inning",
          "Yankees bullpen has a lower ERA (3.22 vs 3.85)",
          "Yankees have higher batting average with RISP",
          "Red Sox have 2 power hitters due up next inning"
        ]
      }
    }
  };