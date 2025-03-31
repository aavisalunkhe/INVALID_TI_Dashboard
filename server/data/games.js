module.exports = [
    {
      id: 'game1',
      homeTeam: {
        id: 'nyy',
        name: 'New York Yankees',
        abbreviation: 'NYY',
        color: '#003087',
        logo: '/assets/teams/yankees.png'
      },
      awayTeam: {
        id: 'bos',
        name: 'Boston Red Sox',
        abbreviation: 'BOS',
        color: '#BD3039',
        logo: '/assets/teams/redsox.png'
      },
      venue: 'Yankee Stadium',
      date: '2025-06-15T19:05:00Z',
      status: 'live',
      inning: 7,
      inningHalf: 'top',
      outs: 1,
      homeScore: 5,
      awayScore: 3,
      baseRunners: {
        first: false,
        second: false,
        third: false
      },
      events: [
        { inning: 1, half: 'top', event: 'Single', team: 'BOS', player: 'Devers' },
        { inning: 1, half: 'bottom', event: 'Single', team: 'NYY', player: 'Judge' },
        { inning: 2, half: 'top', event: 'Double', team: 'BOS', player: 'Verdugo' },
        { inning: 3, half: 'bottom', event: 'Home Run', team: 'NYY', player: 'Judge' },
        { inning: 3, half: 'bottom', event: 'Strikeout', team: 'BOS', player: 'Cole' },
        { inning: 4, half: 'bottom', event: 'Walk', team: 'NYY', player: 'Stanton' },
        { inning: 5, half: 'bottom', event: 'Home Run', team: 'NYY', player: 'Stanton' },
        { inning: 6, half: 'top', event: 'Double Play', team: 'NYY', player: 'Torres' },
        { inning: 7, half: 'top', event: 'Single', team: 'BOS', player: 'Bogaerts' }
      ],
      highlights: [
        {
          inning: 3,
          description: 'Judge hits a 2-run homer with exit velocity of 112 mph',
          type: 'home-run'
        },
        {
          inning: 5,
          description: 'Cole strikes out 3 batters with fastballs over 98 mph',
          type: 'strikeout'
        },
        {
          inning: 7,
          description: 'Double play by Torres saves potential scoring situation',
          type: 'defense'
        }
      ],
      winProbability: {
        home: 68,
        away: 32
      }
    }
  ];