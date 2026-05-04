import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button,
  IconButton, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, useMediaQuery, useTheme,
} from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';

const navItems = [
  { label: 'Table',    value: 'table',   icon: <TableChartIcon fontSize="small" /> },
  { label: 'Live',     value: 'live',    icon: <SportsSoccerIcon fontSize="small" /> },
  { label: 'Fixtures', value: 'team',    icon: <GroupsIcon fontSize="small" /> },
  { label: 'Scorers',  value: 'scorers', icon: <EmojiEventsIcon fontSize="small" /> },
  { label: 'Search',   value: 'search',  icon: <SearchIcon fontSize="small" /> },
];

const PL_LOGO = 'https://crests.football-data.org/PL.png';

const Navbar = ({ onSelectPage, activePage }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const handleNav = (value) => {
    onSelectPage(value);
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{
        background: 'rgba(8,13,26,0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(56,189,248,0.12)',
      }}>
        <Toolbar sx={{ gap: 1 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
            {!logoError ? (
              <img
                src={PL_LOGO}
                alt="Premier League"
                onError={() => setLogoError(true)}
                style={{ width: 32, height: 32, objectFit: 'contain' }}
              />
            ) : (
              <SportsSoccerIcon sx={{ color: '#38bdf8', fontSize: 28 }} />
            )}
            <Typography variant="h6" sx={{
              fontWeight: 800,
              background: 'linear-gradient(90deg, #38bdf8, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px',
            }}>
              EPL Dashboard
            </Typography>
          </Box>

          {!isMobile && navItems.map((item) => {
            const isActive = activePage === item.value;
            return (
              <Button key={item.value} startIcon={item.icon}
                onClick={() => handleNav(item.value)}
                sx={{
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.8rem', textTransform: 'none',
                  borderRadius: '8px', px: 1.5, py: 0.75,
                  position: 'relative', transition: 'all 0.2s',
                  '&:hover': { color: '#f1f5f9', background: 'rgba(255,255,255,0.06)' },
                  ...(isActive && {
                    background: 'rgba(56,189,248,0.1)',
                    '&::after': {
                      content: '""', position: 'absolute', bottom: 0,
                      left: '20%', width: '60%', height: '2px',
                      background: '#38bdf8', borderRadius: '2px 2px 0 0',
                    },
                  }),
                }}
              >
                {item.label}
              </Button>
            );
          })}

          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { background: '#0f172a', width: 220, borderLeft: '1px solid rgba(255,255,255,0.08)' } }}
      >
        <List sx={{ pt: 2 }}>
          {navItems.map((item) => {
            const isActive = activePage === item.value;
            return (
              <ListItem key={item.value} disablePadding>
                <ListItemButton onClick={() => handleNav(item.value)} sx={{
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  background: isActive ? 'rgba(56,189,248,0.08)' : 'transparent',
                  borderLeft: isActive ? '3px solid #38bdf8' : '3px solid transparent',
                  mx: 1, borderRadius: 1, mb: 0.5,
                }}>
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 36 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label}
                    primaryTypographyProps={{ fontWeight: isActive ? 700 : 400, fontSize: '0.9rem' }} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;