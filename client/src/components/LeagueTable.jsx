import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Button, CircularProgress,
  Alert, Box, Tooltip,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { API_BASE, TEAM_WEBSITES, POSITION_COLORS } from '../constants/teams';

const ZONE_LABELS = { 1: 'Champions League', 5: 'Europa League', 18: 'Relegation' };

const TeamCrest = ({ src, name }) => {
  const [error, setError] = useState(false);
  if (error || !src) return (
    <Box sx={{
      width: 22, height: 22, borderRadius: '50%',
      background: 'rgba(56,189,248,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.6rem', fontWeight: 700, color: '#38bdf8', flexShrink: 0,
    }}>
      {name.slice(0, 2).toUpperCase()}
    </Box>
  );
  return (
    <img
      src={src}
      alt={name}
      onError={() => setError(true)}
      style={{ width: 22, height: 22, objectFit: 'contain', flexShrink: 0 }}
    />
  );
};

const LeagueTable = ({ onSelectTeam }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE}/standings`)
      .then(res => setStandings(res.data.standings[0].table))
      .catch(err => setError('Failed to fetch league table: ' + err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
      <CircularProgress sx={{ color: '#38bdf8' }} />
    </Box>
  );
  if (error) return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;

  return (
    <Card sx={{ mt: 4 }}>
      <CardContent sx={{ p: { xs: 1, sm: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="h5">Premier League Table</Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {[
              { color: '#3b82f6', label: 'Champions League' },
              { color: '#f59e0b', label: 'Europa League' },
              { color: '#ef4444', label: 'Relegation' },
            ].map(z => (
              <Box key={z.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: z.color }} />
                <Typography variant="caption" color="text.secondary">{z.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <TableContainer>
          <Table size="small" sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                {['#', 'Team', 'P', 'W', 'D', 'L', 'GF', 'GA', 'GD', 'Pts'].map(h => (
                  <TableCell key={h} align={h === 'Team' ? 'left' : 'center'}>{h}</TableCell>
                ))}
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {standings.map((team) => {
                const zoneColor = POSITION_COLORS[team.position] || 'transparent';
                return (
                  <TableRow key={team.team.id} hover
                    sx={{ '&:hover': { background: 'rgba(255,255,255,0.03)' }, transition: 'background 0.15s' }}
                  >
                    <TableCell align="center" sx={{ width: 48 }}>
                      <Tooltip title={ZONE_LABELS[team.position] || ''} placement="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Box sx={{
                            width: 3, height: 20, borderRadius: 2,
                            background: zoneColor,
                            opacity: zoneColor === 'transparent' ? 0 : 1,
                          }} />
                          <Typography variant="body2" fontWeight={600} color="text.secondary">
                            {team.position}
                          </Typography>
                        </Box>
                      </Tooltip>
                    </TableCell>

                    <TableCell sx={{ minWidth: 200 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <TeamCrest src={team.team.crest} name={team.team.name} />
                        <Typography variant="body2" fontWeight={600} component="a"
                          href={TEAM_WEBSITES[team.team.name] || '#'}
                          target="_blank" rel="noopener noreferrer"
                          sx={{ color: '#f1f5f9', textDecoration: 'none', '&:hover': { color: '#38bdf8' }, transition: 'color 0.15s' }}
                        >
                          {team.team.name.replace(' FC', '').replace(' AFC', '')}
                        </Typography>
                        <OpenInNewIcon sx={{ fontSize: 11, color: '#475569' }} />
                      </Box>
                    </TableCell>

                    {[team.playedGames, team.won, team.draw, team.lost,
                      team.goalsFor, team.goalsAgainst, team.goalDifference].map((val, i) => (
                      <TableCell key={i} align="center">
                        <Typography variant="body2" color="text.secondary">{val}</Typography>
                      </TableCell>
                    ))}

                    <TableCell align="center">
                      <Typography variant="body2" fontWeight={700} sx={{ color: '#f1f5f9' }}>
                        {team.points}
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      {onSelectTeam && (
                        <Button size="small" variant="outlined"
                          onClick={() => onSelectTeam(team.team.name, team.team.crest)}
                          sx={{
                            fontSize: '0.7rem', py: 0.25, px: 1,
                            borderColor: 'rgba(56,189,248,0.3)', color: '#38bdf8',
                            '&:hover': { borderColor: '#38bdf8', background: 'rgba(56,189,248,0.08)' },
                          }}
                        >
                          Fixtures
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default LeagueTable;