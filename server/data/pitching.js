module.exports = {
    default: {
      pitchers: [
        {
          id: 'cole',
          name: 'Gerrit Cole',
          team: 'NYY',
          stats: {
            inningsPitched: 6.2,
            strikeouts: 9,
            walks: 2,
            hits: 4,
            runs: 2,
            earnedRuns: 2,
            pitchCount: 98,
            strikes: 67,
            balls: 31,
            era: 3.22
          },
          pitchTypes: {
            fastball: { count: 54, percentage: 55, avgVelocity: 97.2 },
            slider: { count: 25, percentage: 25, avgVelocity: 88.5 },
            curveball: { count: 12, percentage: 12, avgVelocity: 83.1 },
            changeup: { count: 7, percentage: 8, avgVelocity: 86.4 }
          },
          velocityDistribution: [
            { range: '80-85', count: 5 },
            { range: '85-90', count: 15 },
            { range: '90-95', count: 35 },
            { range: '95-100', count: 40 },
            { range: '100+', count: 5 }
          ],
          pitchLocations: [] // This would be populated with x,y coordinates
        },
        {
          id: 'severino',
          name: 'Luis Severino',
          team: 'NYY',
          stats: {
            inningsPitched: 0,
            strikeouts: 0,
            walks: 0,
            hits: 0,
            runs: 0,
            earnedRuns: 0,
            pitchCount: 0,
            strikes: 0,
            balls: 0,
            era: 3.48
          },
          pitchTypes: {
            fastball: { count: 0, percentage: 58, avgVelocity: 96.8 },
            slider: { count: 0, percentage: 22, avgVelocity: 87.9 },
            curveball: { count: 0, percentage: 10, avgVelocity: 82.5 },
            changeup: { count: 0, percentage: 10, avgVelocity: 87.2 }
          },
          velocityDistribution: [
            { range: '80-85', count: 3 },
            { range: '85-90', count: 12 },
            { range: '90-95', count: 38 },
            { range: '95-100', count: 42 },
            { range: '100+', count: 5 }
          ],
          pitchLocations: [] // This would be populated with x,y coordinates
        }
      ]
    }
  };