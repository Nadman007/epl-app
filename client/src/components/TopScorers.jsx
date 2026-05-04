import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, CircularProgress, Alert, Box,
} from '@mui/material';
import { API_BASE } from '../constants/teams';

const MEDALS = ['🥇', '🥈', '🥉'];

const TeamCrest = ({ src, name }) => {
  const [error, setError] = useState(false);
  if (error || !src) return (
    <Box sx={{
      width: 20, height: 20, borderRadius: '50%',
      background: 'rgba(56,189,248,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.55rem', fontWeight: 700, color: '#38bdf8', flexShrink: 0,
    }}>
      {name?.slice(0, 2).toUpperCase()}
    </Box>
  );
  return (
    <img src={src} alt={name} onError={() => setError(true)}
      style={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0 }} />
  );
};

const TopScorers = () => {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/scorers`)
      .then(res => setScorers(res.data.scorers))
      .catch(() => setError('Failed to fetch top scorers.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
      <CircularProgress sx={{ color: '#38bdf8' }} />
    </Box>
  );
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  const maxGoals = scorers[0]?.goals || 1;

  return (
    <Card sx={{ maxWidth: 700, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3 }}>⚽ Top Scorers</Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Player</TableCell>
                <TableCell>Club</TableCell>
                <TableCell align="center">Goals</TableCell>
                <TableCell align="center">Assists</TableCell>
                <TableCell align="center">Played</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scorers.map((scorer, idx) => (
                <TableRow key={scorer.player.id} hover
                  sx={{ '&:hover': { background: 'rgba(255,255,255,0.03)' } }}
                >
                  <TableCell sx={{ width: 40 }}>
                    {idx < 3
                      ? <Typography variant="body2">{MEDALS[idx]}</Typography>
                      : <Typography variant="body2" color="text.secondary" fontWeight={600}>{idx + 1}</Typography>}
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2" fontWeight={600}
                      sx={{ color: idx === 0 ? '#f59e0b' : '#f1f5f9' }}>
                      {scorer.player.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">{scorer.player.nationality}</Typography>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TeamCrest src={scorer.team.crest} name={scorer.team.name} />
                      <Typography variant="body2" color="text.secondary">
                        {scorer.team.name.replace(' FC', '').replace(' AFC', '')}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                      <Box sx={{
                        height: 6, borderRadius: 3,
                        width: `${(scorer.goals / maxGoals) * 60}px`,
                        background: idx === 0 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'rgba(56,189,248,0.4)',
                        minWidth: 6,
                      }} />
                      <Typography variant="body2" fontWeight={700}
                        sx={{ color: idx === 0 ? '#f59e0b' : '#f1f5f9', minWidth: 20 }}>
                        {scorer.goals}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary">{scorer.assists ?? '–'}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" color="text.secondary">{scorer.playedMatches ?? '–'}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TopScorers;