module.exports = {
    default: {
      players: [
        {
          id: 'torres',
          name: 'Gleyber Torres',
          team: 'NYY',
          position: '2B',
          stats: {
            defensiveRunsSaved: 3.7,
            fieldingPercentage: 0.982,
            outsAboveAverage: 5,
            errors: 1,
            assists: 12,
            putouts: 8
          },
          fieldingBreakdown: {
            routinePlays: { percentage: 100, total: 15, made: 15 },
            likelyPlays: { percentage: 85, total: 7, made: 6 },
            evenPlays: { percentage: 55, total: 9, made: 5 },
            unlikelyPlays: { percentage: 30, total: 10, made: 3 },
            remotePlays: { percentage: 8, total: 12, made: 1 }
          }
        },
        {
          id: 'volpe',
          name: 'Anthony Volpe',
          team: 'NYY',
          position: 'SS',
          stats: {
            defensiveRunsSaved: 2.9,
            fieldingPercentage: 0.975,
            outsAboveAverage: 4,
            errors: 0,
            assists: 10,
            putouts: 5
          },
          fieldingBreakdown: {
            routinePlays: { percentage: 100, total: 12, made: 12 },
            likelyPlays: { percentage: 90, total: 10, made: 9 },
            evenPlays: { percentage: 60, total: 5, made: 3 },
            unlikelyPlays: { percentage: 25, total: 8, made: 2 },
            remotePlays: { percentage: 5, total: 20, made: 1 }
          }
        },
        {
          id: 'judge',
          name: 'Aaron Judge',
          team: 'NYY',
          position: 'CF',
          stats: {
            defensiveRunsSaved: 1.8,
            fieldingPercentage: 0.990,
            outsAboveAverage: 3,
            errors: 0,
            assists: 1,
            putouts: 6
          },
          fieldingBreakdown: {
            routinePlays: { percentage: 100, total: 8, made: 8 },
            likelyPlays: { percentage: 80, total: 5, made: 4 },
            evenPlays: { percentage: 50, total: 4, made: 2 },
            unlikelyPlays: { percentage: 20, total: 5, made: 1 },
            remotePlays: { percentage: 0, total: 3, made: 0 }
          }
        }
      ],
      defensiveRunsSaved: [
        { game: 1, value: 0.2 },
        { game: 2, value: 0.5 },
        { game: 3, value: 0.3 },
        { game: 4, value: -0.1 },
        { game: 5, value: 0.4 },
        { game: 6, value: 0.6 },
        { game: 7, value: 0.2 },
        { game: 8, value: 0.5 },
        { game: 9, value: 0.7 },
        { game: 10, value: 0.4 }
      ]
    }
  };