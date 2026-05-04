import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, CircularProgress, Alert,
  Box, Chip, ToggleButtonGroup, ToggleButton, Divider,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HomeIcon from '@mui/icons-material/Home';
import FlightIcon from '@mui/icons-material/Flight';
import { API_BASE, TEAM_WEBSITES } from '../constants/teams';

const RESULT_CONFIG = {
  win:  { label: 'W', color: '#22c55e' },
  draw: { label: 'D', color: '#f59e0b' },
  loss: { label: 'L', color: '#ef4444' },
};

const TeamCrest = ({ src, name, size = 32 }) => {
  const [error, setError] = useState(false);
  if (error || !src) return (
    <Box sx={{
      width: size, height: size, borderRadius: '50%',
      background: 'rgba(56,189,248,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.3 + 'px', fontWeight: 700, color: '#38bdf8', flexShrink: 0,
    }}>
      {name?.slice(0, 2).toUpperCase()}
    </Box>
  );
  return (
    <img src={src} alt={name} onError={() => setError(true)}
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }} />
  );
};

const getResult = (fixture, teamName) => {
  const { fullTime } = fixture.score;
  if (fullTime.home == null) return null;
  const isHome = fixture.homeTeam.name === teamName;
  const scored   = isHome ? fullTime.home : fullTime.away;
  const conceded = isHome ? fullTime.away : fullTime.home;
  if (scored > conceded) return 'win';
  if (scored < conceded) return 'loss';
  return 'draw';
};

const TeamProfile = ({ teamId, teamName, teamCrest }) => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [filter, setFilter]     = useState('all');

  useEffect(() => {
    if (!teamId) return;
    setLoading(true);
    axios.get(`${API_BASE}/teams/${teamId}/matches`)
      .then(res => setFixtures(res.data.matches))
      .catch(() => setError('Failed to fetch fixtures.'))
      .finally(() => setLoading(false));
  }, [teamId]);

  if (!teamId) return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography fontSize="3rem" mb={1}>👈</Typography>
      <Typography color="text.secondary">Select a team from the League Table to view their fixtures.</Typography>
    </Box>
  );
  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
      <CircularProgress sx={{ color: '#38bdf8' }} />
    </Box>
  );
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  const shortName = teamName.replace(' FC', '').replace(' AFC', '');
  const filtered  = fixtures.filter(f => {
    if (filter === 'home') return f.homeTeam.name === teamName;
    if (filter === 'away') return f.awayTeam.name === teamName;
    return true;
  });

  const played = fixtures.filter(f => f.score.fullTime.home != null);
  const wins   = played.filter(f => getResult(f, teamName) === 'win').length;
  const draws  = played.filter(f => getResult(f, teamName) === 'draw').length;
  const losses = played.filter(f => getResult(f, teamName) === 'loss').length;

  return (
    <Card sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TeamCrest src={teamCrest} name={teamName} size={48} />
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h5">{shortName}</Typography>
                <a href={TEAM_WEBSITES[teamName] || '#'} target="_blank" rel="noopener noreferrer">
                  <OpenInNewIcon sx={{ fontSize: 16, color: '#38bdf8' }} />
                </a>
              </Box>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                {played.length} matches played this season
              </Typography>
            </Box>
          </Box>

          {played.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {[{ label: 'W', val: wins, color: '#22c55e' }, { label: 'D', val: draws, color: '#f59e0b' }, { label: 'L', val: losses, color: '#ef4444' }].map(s => (
                <Box key={s.label} sx={{
                  textAlign: 'center', px: 2, py: 1, borderRadius: 2,
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                }}>
                  <Typography variant="h6" fontWeight={800} sx={{ color: s.color }}>{s.val}</Typography>
                  <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ mb: 2 }}>
          <ToggleButtonGroup value={filter} exclusive onChange={(_, v) => v && setFilter(v)} size="small">
            {[{ value: 'all', label: 'All' }, { value: 'home', label: 'Home', icon: <HomeIcon fontSize="inherit" /> }, { value: 'away', label: 'Away', icon: <FlightIcon fontSize="inherit" /> }].map(f => (
              <ToggleButton key={f.value} value={f.value}
                sx={{
                  color: '#94a3b8', borderColor: 'rgba(255,255,255,0.1)',
                  fontSize: '0.75rem', gap: 0.5,
                  '&.Mui-selected': { color: '#38bdf8', background: 'rgba(56,189,248,0.1)', borderColor: 'rgba(56,189,248,0.3)' },
                }}>
                {f.icon}{f.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.06)' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {filtered.length === 0 && (
            <Typography color="text.secondary" sx={{ py: 3, textAlign: 'center' }}>No fixtures found.</Typography>
          )}
          {filtered.map(f => {
            const result = getResult(f, teamName);
            const rc = result ? RESULT_CONFIG[result] : null;
            const isHome = f.homeTeam.name === teamName;
            const opponent     = isHome ? f.awayTeam : f.homeTeam;
            const scored       = f.score.fullTime.home != null ? (isHome ? f.score.fullTime.home : f.score.fullTime.away) : null;
            const conceded     = f.score.fullTime.home != null ? (isHome ? f.score.fullTime.away : f.score.fullTime.home) : null;

            return (
              <Box key={f.id} sx={{
                display: 'flex', alignItems: 'center', gap: 2, p: 1.5, borderRadius: 1.5,
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                '&:hover': { borderColor: 'rgba(56,189,248,0.15)' },
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ minWidth: 80 }}>
                  {new Date(f.utcDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </Typography>
                <Chip size="small" label={isHome ? 'H' : 'A'}
                  sx={{
                    fontSize: '0.65rem', height: 18, minWidth: 24,
                    background: isHome ? 'rgba(56,189,248,0.1)' : 'rgba(148,163,184,0.1)',
                    color: isHome ? '#38bdf8' : '#94a3b8',
                  }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                  <TeamCrest src={opponent.crest} name={opponent.name} size={20} />
                  <Typography variant="body2">
                    {opponent.name.replace(' FC', '').replace(' AFC', '')}
                  </Typography>
                </Box>
                {scored != null ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" fontWeight={700}>{scored}–{conceded}</Typography>
                    {rc && (
                      <Chip size="small" label={rc.label}
                        sx={{ fontSize: '0.65rem', height: 18, minWidth: 24, fontWeight: 700, background: `${rc.color}22`, color: rc.color }} />
                    )}
                  </Box>
                ) : (
                  <Typography variant="caption" color="text.secondary">
                    {new Date(f.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TeamProfile;