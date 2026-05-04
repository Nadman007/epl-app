import React, { useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, Typography, CircularProgress, Alert,
  Box, TextField, Button, Chip, Divider, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { API_BASE, TEAM_IDS } from '../constants/teams';

const POSITION_COLORS = {
  Goalkeeper: '#f59e0b',
  Defender:   '#3b82f6',
  Midfielder: '#22c55e',
  Forward:    '#ef4444',
};

const POSITION_EMOJI = {
  Goalkeeper: '🧤',
  Defender:   '🛡️',
  Midfielder: '⚙️',
  Forward:    '⚡',
};

const InfoRow = ({ label, value }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 0.75, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body2" fontWeight={600}>{value || '–'}</Typography>
  </Box>
);

const TeamCrest = ({ src, name }) => {
  const [error, setError] = useState(false);
  if (error || !src) return null;
  return <img src={src} alt={name} onError={() => setError(true)} style={{ width: 20, height: 20, objectFit: 'contain' }} />;
};

const PlayerSearch = () => {
  const [query, setQuery]       = useState('');
  const [player, setPlayer]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setPlayer(null);
    setSearched(true);

    try {
      const teamIds = Object.values(TEAM_IDS);
      let found = null;

      for (let i = 0; i < teamIds.length && !found; i += 4) {
        const batch = teamIds.slice(i, i + 4);
        const results = await Promise.all(
          batch.map(id => axios.get(`${API_BASE}/teams/${id}/squad`).catch(() => null))
        );
        for (let j = 0; j < results.length; j++) {
          if (!results[j]) continue;
          const match = results[j].data.squad.find(
            p => p.name.toLowerCase().includes(query.toLowerCase())
          );
          if (match) {
            const teamName = Object.keys(TEAM_IDS).find(k => TEAM_IDS[k] === batch[j]);
            found = { ...match, teamName, teamCrest: results[j].data.crest };
            break;
          }
        }
      }

      if (found) setPlayer(found);
      else setError(`No player matching "${query}" found in current EPL squads.`);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const posColor = player?.position ? (POSITION_COLORS[player.position] || '#64748b') : '#64748b';
  const posEmoji = player?.position ? (POSITION_EMOJI[player.position] || '⚽') : '⚽';
  const age = player?.dateOfBirth
    ? Math.floor((new Date() - new Date(player.dateOfBirth)) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  return (
    <Card sx={{ maxWidth: 560, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 3 }}>🔍 Player Search</Typography>

        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <TextField fullWidth size="small" value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="e.g. Salah, Haaland, Saka…"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#475569', fontSize: 18 }} />
                </InputAdornment>
              ),
              sx: {
                background: 'rgba(255,255,255,0.04)',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(56,189,248,0.3) !important' },
                '&.Mui-focused fieldset': { borderColor: '#38bdf8 !important' },
              },
            }}
          />
          <Button type="submit" variant="contained"
            disabled={loading || !query.trim()}
            sx={{
              background: 'linear-gradient(135deg, #38bdf8, #0ea5e9)',
              color: '#0a0f1e', fontWeight: 700, px: 2.5, whiteSpace: 'nowrap',
              '&:hover': { background: 'linear-gradient(135deg, #7dd3fc, #38bdf8)' },
              '&.Mui-disabled': { opacity: 0.4 },
            }}
          >
            Search
          </Button>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4, gap: 2 }}>
            <CircularProgress sx={{ color: '#38bdf8' }} size={32} />
            <Typography variant="caption" color="text.secondary">Searching EPL squads…</Typography>
          </Box>
        )}

        {error && <Alert severity="warning">{error}</Alert>}

        {player && (
          <Box>
            <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.06)' }} />

            {/* Player card header */}
            <Box sx={{
              display: 'flex', alignItems: 'center', gap: 2, mb: 2.5, p: 2, borderRadius: 2,
              background: `linear-gradient(135deg, ${posColor}15, transparent)`,
              border: `1px solid ${posColor}25`,
            }}>
              {/* Position avatar */}
              <Box sx={{
                width: 56, height: 56, borderRadius: '50%',
                background: `linear-gradient(135deg, ${posColor}30, ${posColor}10)`,
                border: `2px solid ${posColor}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem', flexShrink: 0,
              }}>
                {posEmoji}
              </Box>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6" fontWeight={700} noWrap>{player.name}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                  {player.position && (
                    <Chip size="small" label={player.position}
                      sx={{ background: `${posColor}20`, color: posColor, fontSize: '0.7rem', height: 20, fontWeight: 600 }} />
                  )}
                  {player.shirtNumber && (
                    <Chip size="small" label={`#${player.shirtNumber}`}
                      sx={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8', fontSize: '0.7rem', height: 20 }} />
                  )}
                </Box>
              </Box>

              {/* Team crest */}
              {player.teamCrest && (
                <Box sx={{ flexShrink: 0 }}>
                  <TeamCrest src={player.teamCrest} name={player.teamName} />
                </Box>
              )}
            </Box>

            <InfoRow label="Club" value={player.teamName?.replace(' FC','').replace(' AFC','')} />
            <InfoRow label="Nationality" value={player.nationality} />
            <InfoRow label="Date of Birth" value={player.dateOfBirth
              ? `${new Date(player.dateOfBirth).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} (age ${age})`
              : null} />
            {player.contract?.until && (
              <InfoRow label="Contract Until" value={player.contract.until.slice(0, 4)} />
            )}
          </Box>
        )}

        {!loading && !player && !error && !searched && (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography color="text.secondary" variant="body2">
              Search for any player currently in an EPL squad.
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PlayerSearch;