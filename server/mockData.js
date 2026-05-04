// Mock data used when API key is not set or API is unavailable
// Replace FOOTBALL_API_KEY in .env with your real key to use live data

const mockStandings = {
  standings: [{
    table: [
      { position: 1,  team: { id: 65, name: 'Manchester City FC' },   playedGames: 38, won: 28, draw: 5,  lost: 5,  goalsFor: 96, goalsAgainst: 45, goalDifference: 51, points: 89 },
      { position: 2,  team: { id: 64, name: 'Liverpool FC' },         playedGames: 38, won: 24, draw: 9,  lost: 5,  goalsFor: 86, goalsAgainst: 41, goalDifference: 45, points: 82 },
      { position: 3,  team: { id: 57, name: 'Arsenal FC' },           playedGames: 38, won: 24, draw: 6,  lost: 8,  goalsFor: 91, goalsAgainst: 29, goalDifference: 62, points: 78 },
      { position: 4,  team: { id: 73, name: 'Tottenham Hotspur FC' }, playedGames: 38, won: 20, draw: 6,  lost: 12, goalsFor: 74, goalsAgainst: 61, goalDifference: 13, points: 66 },
      { position: 5,  team: { id: 61, name: 'Chelsea FC' },           playedGames: 38, won: 18, draw: 9,  lost: 11, goalsFor: 77, goalsAgainst: 63, goalDifference: 14, points: 63 },
      { position: 6,  team: { id: 66, name: 'Manchester United FC' }, playedGames: 38, won: 18, draw: 6,  lost: 14, goalsFor: 57, goalsAgainst: 58, goalDifference: -1, points: 60 },
      { position: 7,  team: { id: 58, name: 'Aston Villa FC' },       playedGames: 38, won: 18, draw: 3,  lost: 17, goalsFor: 76, goalsAgainst: 61, goalDifference: 15, points: 57 },
      { position: 8,  team: { id: 397, name: 'Brighton & Hove Albion FC' }, playedGames: 38, won: 18, draw: 2, lost: 18, goalsFor: 72, goalsAgainst: 53, goalDifference: 19, points: 56 },
      { position: 9,  team: { id: 67, name: 'Newcastle United FC' },  playedGames: 38, won: 16, draw: 5,  lost: 17, goalsFor: 58, goalsAgainst: 56, goalDifference: 2,  points: 53 },
      { position: 10, team: { id: 563, name: 'West Ham United FC' },  playedGames: 38, won: 14, draw: 10, lost: 14, goalsFor: 60, goalsAgainst: 74, goalDifference: -14, points: 52 },
      { position: 11, team: { id: 354, name: 'Crystal Palace FC' },   playedGames: 38, won: 12, draw: 10, lost: 16, goalsFor: 42, goalsAgainst: 52, goalDifference: -10, points: 46 },
      { position: 12, team: { id: 402, name: 'Brentford FC' },        playedGames: 38, won: 13, draw: 7,  lost: 18, goalsFor: 56, goalsAgainst: 65, goalDifference: -9, points: 46 },
      { position: 13, team: { id: 62, name: 'Everton FC' },           playedGames: 38, won: 13, draw: 7,  lost: 18, goalsFor: 40, goalsAgainst: 51, goalDifference: -11, points: 46 },
      { position: 14, team: { id: 76, name: 'Wolverhampton Wanderers FC' }, playedGames: 38, won: 11, draw: 8, lost: 19, goalsFor: 50, goalsAgainst: 65, goalDifference: -15, points: 41 },
      { position: 15, team: { id: 63, name: 'Fulham FC' },            playedGames: 38, won: 11, draw: 7,  lost: 20, goalsFor: 55, goalsAgainst: 76, goalDifference: -21, points: 40 },
      { position: 16, team: { id: 1044, name: 'Bournemouth AFC' },    playedGames: 38, won: 11, draw: 6,  lost: 21, goalsFor: 52, goalsAgainst: 70, goalDifference: -18, points: 39 },
      { position: 17, team: { id: 351, name: 'Nottingham Forest FC' }, playedGames: 38, won: 9, draw: 11, lost: 18, goalsFor: 49, goalsAgainst: 67, goalDifference: -18, points: 38 },
      { position: 18, team: { id: 328, name: 'Burnley FC' },          playedGames: 38, won: 8,  draw: 6,  lost: 24, goalsFor: 35, goalsAgainst: 78, goalDifference: -43, points: 30 },
      { position: 19, team: { id: 389, name: 'Luton Town FC' },       playedGames: 38, won: 6,  draw: 8,  lost: 24, goalsFor: 52, goalsAgainst: 85, goalDifference: -33, points: 26 },
      { position: 20, team: { id: 356, name: 'Sheffield United FC' }, playedGames: 38, won: 3,  draw: 4,  lost: 31, goalsFor: 35, goalsAgainst: 104, goalDifference: -69, points: 16 },
    ]
  }]
};

const mockMatches = {
  matches: [
    {
      id: 1, status: 'IN_PLAY', minute: 67,
      utcDate: new Date().toISOString(),
      homeTeam: { name: 'Arsenal FC' }, awayTeam: { name: 'Chelsea FC' },
      score: { fullTime: { home: 2, away: 1 }, halfTime: { home: 1, away: 0 } }
    },
    {
      id: 2, status: 'IN_PLAY', minute: 45,
      utcDate: new Date().toISOString(),
      homeTeam: { name: 'Liverpool FC' }, awayTeam: { name: 'Manchester City FC' },
      score: { fullTime: { home: 1, away: 1 }, halfTime: { home: 0, away: 1 } }
    },
    {
      id: 3, status: 'SCHEDULED', minute: null,
      utcDate: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      homeTeam: { name: 'Manchester United FC' }, awayTeam: { name: 'Tottenham Hotspur FC' },
      score: { fullTime: { home: null, away: null }, halfTime: { home: null, away: null } }
    },
    {
      id: 4, status: 'FINISHED', minute: null,
      utcDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      homeTeam: { name: 'Newcastle United FC' }, awayTeam: { name: 'Aston Villa FC' },
      score: { fullTime: { home: 3, away: 0 }, halfTime: { home: 1, away: 0 } }
    },
  ]
};

const mockScorers = {
  scorers: [
    { player: { id: 1, name: 'Erling Haaland',   nationality: 'Norway' },  team: { name: 'Manchester City FC' }, goals: 27, assists: 5,  playedMatches: 31 },
    { player: { id: 2, name: 'Cole Palmer',       nationality: 'England' }, team: { name: 'Chelsea FC' },         goals: 22, assists: 11, playedMatches: 34 },
    { player: { id: 3, name: 'Alexander Isak',    nationality: 'Sweden' },  team: { name: 'Newcastle United FC' }, goals: 21, assists: 2,  playedMatches: 30 },
    { player: { id: 4, name: 'Ollie Watkins',     nationality: 'England' }, team: { name: 'Aston Villa FC' },     goals: 19, assists: 13, playedMatches: 37 },
    { player: { id: 5, name: 'Jarrod Bowen',      nationality: 'England' }, team: { name: 'West Ham United FC' }, goals: 16, assists: 7,  playedMatches: 35 },
    { player: { id: 6, name: 'Bukayo Saka',       nationality: 'England' }, team: { name: 'Arsenal FC' },         goals: 16, assists: 9,  playedMatches: 35 },
    { player: { id: 7, name: 'Mohamed Salah',     nationality: 'Egypt' },   team: { name: 'Liverpool FC' },       goals: 15, assists: 13, playedMatches: 32 },
    { player: { id: 8, name: 'Son Heung-min',     nationality: 'South Korea' }, team: { name: 'Tottenham Hotspur FC' }, goals: 14, assists: 6, playedMatches: 34 },
    { player: { id: 9, name: 'Phil Foden',        nationality: 'England' }, team: { name: 'Manchester City FC' }, goals: 14, assists: 8,  playedMatches: 35 },
    { player: { id: 10, name: 'Dominic Solanke',  nationality: 'England' }, team: { name: 'Bournemouth AFC' },    goals: 14, assists: 3,  playedMatches: 38 },
  ]
};

const mockTeamMatches = (teamId) => {
  const teamNames = {
    57: 'Arsenal FC', 58: 'Aston Villa FC', 61: 'Chelsea FC',
    64: 'Liverpool FC', 65: 'Manchester City FC', 66: 'Manchester United FC',
    73: 'Tottenham Hotspur FC', 67: 'Newcastle United FC',
  };
  const teamName = teamNames[teamId] || 'Unknown FC';
  const opponents = ['Chelsea FC', 'Liverpool FC', 'Manchester City FC', 'Arsenal FC',
    'Tottenham Hotspur FC', 'Aston Villa FC', 'Newcastle United FC', 'West Ham United FC'];
  const filtered = opponents.filter(o => o !== teamName);

  return {
    matches: filtered.map((opp, i) => {
      const isHome = i % 2 === 0;
      const finished = i < 5;
      const homeGoals = finished ? Math.floor(Math.random() * 4) : null;
      const awayGoals = finished ? Math.floor(Math.random() * 4) : null;
      const date = new Date();
      date.setDate(date.getDate() + (i - 3) * 7);
      return {
        id: i + 1,
        utcDate: date.toISOString(),
        status: finished ? 'FINISHED' : 'SCHEDULED',
        homeTeam: { name: isHome ? teamName : opp },
        awayTeam: { name: isHome ? opp : teamName },
        score: { fullTime: { home: homeGoals, away: awayGoals } },
      };
    })
  };
};

const mockSquad = (teamId) => {
  const squads = {
    57: [ // Arsenal
      { id: 1, name: 'David Raya', position: 'Goalkeeper', nationality: 'Spain', dateOfBirth: '1995-09-15', shirtNumber: 22 },
      { id: 2, name: 'Bukayo Saka', position: 'Forward', nationality: 'England', dateOfBirth: '2001-09-05', shirtNumber: 7 },
      { id: 3, name: 'Martin Odegaard', position: 'Midfielder', nationality: 'Norway', dateOfBirth: '1998-12-17', shirtNumber: 8 },
      { id: 4, name: 'Declan Rice', position: 'Midfielder', nationality: 'England', dateOfBirth: '1999-01-14', shirtNumber: 41 },
      { id: 5, name: 'Gabriel Martinelli', position: 'Forward', nationality: 'Brazil', dateOfBirth: '2001-06-18', shirtNumber: 11 },
    ],
    65: [ // Man City
      { id: 10, name: 'Erling Haaland', position: 'Forward', nationality: 'Norway', dateOfBirth: '2000-07-21', shirtNumber: 9 },
      { id: 11, name: 'Kevin De Bruyne', position: 'Midfielder', nationality: 'Belgium', dateOfBirth: '1991-06-28', shirtNumber: 17 },
      { id: 12, name: 'Phil Foden', position: 'Midfielder', nationality: 'England', dateOfBirth: '2000-05-28', shirtNumber: 47 },
      { id: 13, name: 'Rodri', position: 'Midfielder', nationality: 'Spain', dateOfBirth: '1996-06-22', shirtNumber: 16 },
    ],
    64: [ // Liverpool
      { id: 20, name: 'Mohamed Salah', position: 'Forward', nationality: 'Egypt', dateOfBirth: '1992-06-15', shirtNumber: 11 },
      { id: 21, name: 'Virgil van Dijk', position: 'Defender', nationality: 'Netherlands', dateOfBirth: '1991-07-08', shirtNumber: 4 },
      { id: 22, name: 'Trent Alexander-Arnold', position: 'Defender', nationality: 'England', dateOfBirth: '1998-10-07', shirtNumber: 66 },
      { id: 23, name: 'Alisson Becker', position: 'Goalkeeper', nationality: 'Brazil', dateOfBirth: '1992-10-02', shirtNumber: 1 },
    ],
    66: [ // Man United
      { id: 30, name: 'Marcus Rashford', position: 'Forward', nationality: 'England', dateOfBirth: '1997-10-31', shirtNumber: 10 },
      { id: 31, name: 'Bruno Fernandes', position: 'Midfielder', nationality: 'Portugal', dateOfBirth: '1994-09-08', shirtNumber: 8 },
      { id: 32, name: 'Andre Onana', position: 'Goalkeeper', nationality: 'Cameroon', dateOfBirth: '1996-04-02', shirtNumber: 24 },
    ],
    73: [ // Spurs
      { id: 40, name: 'Son Heung-min', position: 'Forward', nationality: 'South Korea', dateOfBirth: '1992-07-08', shirtNumber: 7 },
      { id: 41, name: 'James Maddison', position: 'Midfielder', nationality: 'England', dateOfBirth: '1996-11-23', shirtNumber: 10 },
    ],
    61: [ // Chelsea
      { id: 50, name: 'Cole Palmer', position: 'Midfielder', nationality: 'England', dateOfBirth: '2002-05-06', shirtNumber: 20 },
      { id: 51, name: 'Nicolas Jackson', position: 'Forward', nationality: 'Senegal', dateOfBirth: '2001-06-20', shirtNumber: 15 },
      { id: 52, name: 'Enzo Fernandez', position: 'Midfielder', nationality: 'Argentina', dateOfBirth: '2001-01-17', shirtNumber: 8 },
    ],
  };
  const defaultSquad = [
    { id: 99, name: 'John Smith', position: 'Forward', nationality: 'England', dateOfBirth: '1998-03-12', shirtNumber: 9 },
    { id: 100, name: 'Mike Johnson', position: 'Midfielder', nationality: 'England', dateOfBirth: '1997-06-20', shirtNumber: 8 },
  ];
  return { squad: squads[teamId] || defaultSquad };
};

module.exports = { mockStandings, mockMatches, mockScorers, mockTeamMatches, mockSquad };
