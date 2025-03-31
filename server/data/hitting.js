module.exports = {
    default: {
      batters: [
        {
          id: 'judge',
          name: 'Aaron Judge',
          team: 'NYY',
          stats: {
            atBats: 4,
            hits: 2,
            runs: 2,
            rbi: 3,
            homeRuns: 1,
            strikeouts: 1,
            walks: 0,
            avg: 0.280,
            obp: 0.352,
            slg: 0.475
          },
          exitVelocity: 95.2,
          launchAngle: 18.5,
          barrelRate: 22.4,
          hits: [
            { type: "fly", x: 0.7, y: 0.3, exitVelocity: 98, launchAngle: 25 },
            { type: "ground", x: 0.3, y: 0.7, exitVelocity: 92, launchAngle: 5 },
            { type: "line", x: 0.5, y: 0.5, exitVelocity: 105, launchAngle: 15 },
            { type: "fly", x: 0.8, y: 0.2, exitVelocity: 110, launchAngle: 30 },
            { type: "line", x: 0.4, y: 0.6, exitVelocity: 100, launchAngle: 12 },
            { type: "ground", x: 0.2, y: 0.8, exitVelocity: 88, launchAngle: 0 },
            { type: "fly", x: 0.9, y: 0.1, exitVelocity: 115, launchAngle: 35 }
          ]
        },
        {
          id: 'stanton',
          name: 'Giancarlo Stanton',
          team: 'NYY',
          stats: {
            atBats: 3,
            hits: 1,
            runs: 1,
            rbi: 2,
            homeRuns: 1,
            strikeouts: 1,
            walks: 1,
            avg: 0.265,
            obp: 0.340,
            slg: 0.512
          },
          exitVelocity: 97.8,
          launchAngle: 16.2,
          barrelRate: 19.8,
          hits: [
            { type: "line", x: 0.6, y: 0.4, exitVelocity: 112, launchAngle: 18 },
            { type: "ground", x: 0.4, y: 0.7, exitVelocity: 95, launchAngle: 3 },
            { type: "fly", x: 0.7, y: 0.2, exitVelocity: 108, launchAngle: 28 },
            { type: "line", x: 0.5, y: 0.5, exitVelocity: 118, launchAngle: 14 },
            { type: "ground", x: 0.3, y: 0.8, exitVelocity: 90, launchAngle: -2 },
            { type: "fly", x: 0.8, y: 0.3, exitVelocity: 105, launchAngle: 32 }
          ]
        }
      ],
      performanceMetrics: [
        { player: "Judge", avgExitVelocity: 95.2, avgDistance: 410, barrelRate: 22.4 },
        { player: "Stanton", avgExitVelocity: 97.8, avgDistance: 415, barrelRate: 19.8 },
        { player: "Torres", avgExitVelocity: 89.5, avgDistance: 380, barrelRate: 12.1 },
        { player: "Rizzo", avgExitVelocity: 88.2, avgDistance: 375, barrelRate: 10.5 }
      ]
    }
  };