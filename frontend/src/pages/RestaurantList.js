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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Temporary mock data
const mockRestaurants = [
  {
    id: 1,
    name: 'The Gourmet Kitchen',
    image: 'https://source.unsplash.com/random/300x200/?restaurant',
    rating: 4.5,
    cuisine: 'Italian',
    location: 'Downtown',
  },
  {
    id: 2,
    name: 'Sushi Master',
    image: 'https://source.unsplash.com/random/300x200/?sushi',
    rating: 4.8,
    cuisine: 'Japanese',
    location: 'Westside',
  },
  {
    id: 3,
    name: 'Burger Paradise',
    image: 'https://source.unsplash.com/random/300x200/?burger',
    rating: 4.2,
    cuisine: 'American',
    location: 'Eastside',
  },
];

function RestaurantList() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredRestaurants = mockRestaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurants
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search restaurants..."
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
                }}
                onClick={() => navigate(`/restaurants/${restaurant.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {restaurant.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={restaurant.rating} precision={0.5} readOnly />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({restaurant.rating})
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.cuisine} • {restaurant.location}
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