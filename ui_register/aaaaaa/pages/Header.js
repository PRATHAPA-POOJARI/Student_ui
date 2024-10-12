// Header.js
import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Get authentication state and logout function from context

  useEffect(() => {
    // This will trigger re-render when `isAuthenticated` changes
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout(); // Call logout from context
    navigate('/'); // Redirect to login page
  };

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to login page
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
       <AppBar position="static" color="primary" enableColorOnDark>
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Information System
          </Typography>

          {/* Show Login or Logout button based on authentication state */}
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleLoginRedirect}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
