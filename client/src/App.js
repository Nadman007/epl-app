import React, { useState } from 'react';
import './App.css';
import { ThemeProvider, createTheme, CssBaseline, Box, useMediaQuery } from '@mui/material';
import Navbar from './components/Navbar';
import LiveMatches from './components/LiveMatches';
import LeagueTable from './components/LeagueTable';
import TopScorers from './components/TopScorers';
import TeamProfile from './components/TeamProfile';
import PlayerSearch from './components/PlayerSearch';

const leftStats = [
  { label: 'Season',      value: '2023/24',  sub: 'Premier League',           accent: 'accent-blue'  },
  { label: 'Total Goals', value: '1,246',    sub: 'Scored this season',        accent: 'accent-green' },
  { label: 'Top Scorer',  value: 'Haaland',  sub: '27 goals · Man City',       accent: 'accent-gold'  },
  { label: 'Matches',     value: '380',      sub: 'Played this season',        accent: ''             },
];

const rightStats = [
  { label: 'Champions',    value: 'Man City', sub: '89 pts · 1st place',        accent: 'accent-blue'  },
  { label: 'Top Assists',  value: 'Watkins',  sub: '13 assists · Aston Villa',  accent: 'accent-gold'  },
  { label: 'Relegated',    value: '3 Teams',  sub: 'Burnley · Luton · Sheff U', accent: 'accent-red'   },
  { label: 'Clean Sheets', value: '94',       sub: 'Across all clubs',          accent: ''             },
];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#38bdf8' },
    secondary: { main: '#f59e0b' },
    background: { default: '#080d1a', paper: '#0f172a' },
    text: { primary: '#f1f5f9', secondary: '#94a3b8' },
  },
  typography: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    h5: { fontWeight: 700, letterSpacing: '-0.5px' },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { backgroundImage: 'none', border: '1px solid rgba(255,255,255,0.06)' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#94a3b8', fontWeight: 600, fontSize: '0.75rem',
          textTransform: 'uppercase', letterSpacing: '0.05em',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
        body: { borderBottom: '1px solid rgba(255,255,255,0.04)' },
      },
    },
  },
});

const TEAM_IDS = {
  'Arsenal FC': 57, 'Aston Villa FC': 58, 'Bournemouth AFC': 1044,
  'Brentford FC': 402, 'Brighton & Hove Albion FC': 397, 'Burnley FC': 328,
  'Chelsea FC': 61, 'Crystal Palace FC': 354, 'Everton FC': 62,
  'Fulham FC': 63, 'Liverpool FC': 64, 'Luton Town FC': 389,
  'Manchester City FC': 65, 'Manchester United FC': 66, 'Newcastle United FC': 67,
  'Nottingham Forest FC': 351, 'Sheffield United FC': 356,
  'Tottenham Hotspur FC': 73, 'West Ham United FC': 563,
  'Wolverhampton Wanderers FC': 76,
};

function App() {
  const [page, setPage] = useState('table');
  const [selectedTeam, setSelectedTeam] = useState({ id: null, name: '', crest: '' });
  const isWide = useMediaQuery('(min-width:1500px)');

  const handleSelectTeam = (name, crest) => {
    setSelectedTeam({ id: TEAM_IDS[name], name, crest });
    setPage('team');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: '#080d1a', position: 'relative', overflow: 'hidden' }}>

        <div className="dot-grid" />
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />

        <div className="deco-ball deco-ball-1">⚽</div>
        <div className="deco-ball deco-ball-2">⚽</div>
        <div className="deco-ball deco-ball-3">⚽</div>
        <div className="deco-ball deco-ball-4">⚽</div>

        {isWide && (
          <>
            <div className="side-decoration side-decoration-left" />
            <div className="side-decoration side-decoration-right" />

            <div className="side-panel side-panel-left">
              {leftStats.map((s, i) => (
                <div key={i} className="side-stat side-stat-left">
                  <div className="side-stat-label">{s.label}</div>
                  <div className={`side-stat-value ${s.accent}`}>{s.value}</div>
                  <div className="side-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>

            <div className="side-panel side-panel-right">
              {rightStats.map((s, i) => (
                <div key={i} className="side-stat side-stat-right">
                  <div className="side-stat-label">{s.label}</div>
                  <div className={`side-stat-value ${s.accent}`}>{s.value}</div>
                  <div className="side-stat-sub">{s.sub}</div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="app-content">
          <Navbar onSelectPage={setPage} activePage={page} />
          <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 1, sm: 2 }, pb: 6 }}>
            {page === 'table'   && <LeagueTable onSelectTeam={handleSelectTeam} />}
            {page === 'live'    && <LiveMatches />}
            {page === 'team'    && <TeamProfile teamId={selectedTeam.id} teamName={selectedTeam.name} teamCrest={selectedTeam.crest} />}
            {page === 'scorers' && <TopScorers />}
            {page === 'search'  && <PlayerSearch />}
          </Box>
        </div>

      </Box>
    </ThemeProvider>
  );
}

export default App;