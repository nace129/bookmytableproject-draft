import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Rating,
  Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import restaurantData from '../data/restaurants.json';

function RestaurantList() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredRestaurants = restaurantData.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCostRating = (rating) => {
    return '$'.repeat(rating);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurants
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search restaurants by name or cuisine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Grid container spacing={4}>
          {filteredRestaurants.map((restaurant) => (
            <Grid item key={restaurant.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.2s ease-in-out',
                  },
                }}
                onClick={() => navigate(`/restaurants/${restaurant.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://source.unsplash.com/random/300x200/?${restaurant.cuisine.split(',')[0].toLowerCase()}`}
                  alt={restaurant.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {restaurant.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                    <Rating value={restaurant.rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({restaurant.rating}) • {restaurant.num_reviews} reviews
                    </Typography>
                    <Chip label={getCostRating(restaurant.cost_rating)} color="primary" size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {restaurant.cuisine}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.location.city}, {restaurant.location.state}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Bookings Today: {restaurant.bookings_today}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default RestaurantList; 