import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import RestaurantIcon from '@mui/icons-material/Restaurant';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          <RestaurantIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BookMyTable
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/restaurants')}>
            Restaurants
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => navigate('/register')}
            sx={{ ml: 1 }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 