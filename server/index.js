require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { mockStandings, mockMatches, mockScorers, mockTeamMatches, mockSquad } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.FOOTBALL_API_KEY;
const API_BASE = 'https://api.football-data.org/v4';
const USE_MOCK = !API_KEY || API_KEY === 'your_api_key_here';

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Helper to call the real API
const apiGet = (path) =>
  axios.get(`${API_BASE}${path}`, {
    headers: { 'X-Auth-Token': API_KEY },
  });

if (USE_MOCK) {
  console.log('⚠️  No API key found — running with mock data.');
  console.log('   To use live data: copy .env.example to .env and add your key.');
} else {
  console.log('✅  API key found — using live football-data.org data.');
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /api/standings — Premier League table
app.get('/api/standings', async (req, res) => {
  if (USE_MOCK) return res.json(mockStandings);
  try {
    const { data } = await apiGet('/competitions/PL/standings');
    res.json(data);
  } catch (err) {
    console.error('Standings error:', err.message);
    res.status(500).json({ error: 'Failed to fetch standings' });
  }
});

// GET /api/matches/live — Today's matches (live + scheduled)
app.get('/api/matches/live', async (req, res) => {
  if (USE_MOCK) return res.json(mockMatches);
  try {
    const today = new Date().toISOString().slice(0, 10);
    const { data } = await apiGet(`/competitions/PL/matches?dateFrom=${today}&dateTo=${today}`);
    res.json(data);
  } catch (err) {
    console.error('Matches error:', err.message);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

// GET /api/scorers — Top scorers
app.get('/api/scorers', async (req, res) => {
  if (USE_MOCK) return res.json(mockScorers);
  try {
    const { data } = await apiGet('/competitions/PL/scorers?limit=20');
    res.json(data);
  } catch (err) {
    console.error('Scorers error:', err.message);
    res.status(500).json({ error: 'Failed to fetch scorers' });
  }
});

// GET /api/teams/:id/matches — Fixtures for a specific team
app.get('/api/teams/:id/matches', async (req, res) => {
  const teamId = parseInt(req.params.id);
  if (USE_MOCK) return res.json(mockTeamMatches(teamId));
  try {
    const { data } = await apiGet(`/teams/${teamId}/matches?competitions=PL&limit=38`);
    res.json(data);
  } catch (err) {
    console.error('Team matches error:', err.message);
    res.status(500).json({ error: 'Failed to fetch team matches' });
  }
});

// GET /api/teams/:id/squad — Squad for a specific team
app.get('/api/teams/:id/squad', async (req, res) => {
  const teamId = parseInt(req.params.id);
  if (USE_MOCK) return res.json(mockSquad(teamId));
  try {
    const { data } = await apiGet(`/teams/${teamId}`);
    res.json({ squad: data.squad });
  } catch (err) {
    console.error('Squad error:', err.message);
    res.status(500).json({ error: 'Failed to fetch squad' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mode: USE_MOCK ? 'mock' : 'live', port: PORT });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
