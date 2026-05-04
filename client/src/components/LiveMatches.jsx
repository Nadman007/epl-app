import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, CircularProgress,
  Alert, Box, Chip, Divider, IconButton, Tooltip,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { API_BASE } from '../constants/teams';

const STATUS_CONFIG = {
  IN_PLAY:   { label: 'LIVE', color: '#ef4444', pulse: true },
  PAUSED:    { label: 'HT',   color: '#f59e0b', pulse: false },
  FINISHED:  { label: 'FT',   color: '#64748b', pulse: false },
  SCHEDULED: { label: 'Soon', color: '#38bdf8', pulse: false },
  TIMED:     { label: 'Soon', color: '#38bdf8', pulse: false },
};

const TeamCrest = ({ src, name }) => {
  const [error, setError] = useState(false);
  if (error || !src) return (
    <Box sx={{
      width: 28, height: 28, borderRadius: '50%',
      background: 'rgba(56,189,248,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.6rem', fontWeight: 700, color: '#38bdf8', flexShrink: 0,
    }}>
      {name?.slice(0, 2).toUpperCase()}
    </Box>
  );
  return (
    <img src={src} alt={name} onError={() => setError(true)}
      style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }} />
  );
};

const MatchCard = ({ match }) => {
  const status = STATUS_CONFIG[match.status] || { label: match.status, color: '#64748b', pulse: false };
  const homeScore = match.score.fullTime.home ?? '-';
  const awayScore = match.score.fullTime.away ?? '-';

  return (
    <Box sx={{
      p: 2, borderRadius: 2,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      '&:hover': { borderColor: 'rgba(56,189,248,0.2)' },
      transition: 'border-color 0.2s',
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
        <Chip size="small" label={status.label}
          icon={status.pulse
            ? <FiberManualRecordIcon sx={{ fontSize: '8px !important', animation: 'pulse 1.5s infinite' }} />
            : undefined}
          sx={{
            fontSize: '0.65rem', fontWeight: 700, height: 20,
            background: `${status.color}22`, color: status.color,
            border: `1px solid ${status.color}44`,
            '& .MuiChip-icon': { color: status.color },
          }}
        />
        {match.minute && (
          <Typography variant="caption" color="text.secondary">{match.minute}'</Typography>
        )}
        <Typography variant="caption" color="text.secondary">
          {new Date(match.utcDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
        {/* Home team */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1, justifyContent: 'flex-end' }}>
          <Typography variant="body2" fontWeight={600} sx={{ textAlign: 'right' }}>
            {match.homeTeam.name.replace(' FC', '').replace(' AFC', '')}
          </Typography>
          <TeamCrest src={match.homeTeam.crest} name={match.homeTeam.name} />
        </Box>

        {/* Score */}
        <Box sx={{
          display: 'flex', gap: 1, alignItems: 'center',
          background: 'rgba(0,0,0,0.3)', borderRadius: 1.5,
          px: 2, py: 0.5, minWidth: 64, justifyContent: 'center',
        }}>
          <Typography variant="h6" fontWeight={800}>{homeScore}</Typography>
          <Typography variant="body2" color="text.secondary">–</Typography>
          <Typography variant="h6" fontWeight={800}>{awayScore}</Typography>
        </Box>

        {/* Away team */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
          <TeamCrest src={match.awayTeam.crest} name={match.awayTeam.name} />
          <Typography variant="body2" fontWeight={600}>
            {match.awayTeam.name.replace(' FC', '').replace(' AFC', '')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchMatches = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/matches/live`);
      setMatches(res.data.matches);
      setLastUpdated(new Date());
      setError(null);
    } catch {
      setError('Failed to fetch matches.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
    const interval = setInterval(fetchMatches, 60000);
    return () => clearInterval(interval);
  }, [fetchMatches]);

  const liveMatches  = matches.filter(m => m.status === 'IN_PLAY' || m.status === 'PAUSED');
  const otherMatches = matches.filter(m => m.status !== 'IN_PLAY' && m.status !== 'PAUSED');

  return (
    <Card sx={{ maxWidth: 680, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h5">Live Matches</Typography>
            {liveMatches.length > 0 && (
              <Chip size="small" label={`${liveMatches.length} live`}
                sx={{ background: '#ef444422', color: '#ef4444', border: '1px solid #ef444444', fontSize: '0.7rem', fontWeight: 700 }} />
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {lastUpdated && (
              <Typography variant="caption" color="text.secondary">
                Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            )}
            <Tooltip title="Refresh">
              <IconButton size="small" onClick={fetchMatches} sx={{ color: '#38bdf8' }}>
                <RefreshIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#38bdf8' }} />
          </Box>
        )}
        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && matches.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Typography fontSize="2.5rem" mb={1}>⚽</Typography>
            <Typography color="text.secondary">No matches right now.</Typography>
            <Typography variant="caption" color="text.secondary">Check back on matchday!</Typography>
          </Box>
        )}

        {liveMatches.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>In Progress</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
              {liveMatches.map(m => <MatchCard key={m.id} match={m} />)}
            </Box>
          </Box>
        )}

        {otherMatches.length > 0 && (
          <>
            {liveMatches.length > 0 && <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.06)' }} />}
            <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>Today's Fixtures</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mt: 1 }}>
              {otherMatches.map(m => <MatchCard key={m.id} match={m} />)}
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveMatches;