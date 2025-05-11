import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Rating,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Temporary mock data
const mockRestaurant = {
  id: 1,
  name: 'The Gourmet Kitchen',
  image: 'https://source.unsplash.com/random/800x400/?restaurant',
  rating: 4.5,
  cuisine: 'Italian',
  location: '123 Main St, Downtown',
  coordinates: { lat: 37.7749, lng: -122.4194 }, // Example coordinates (San Francisco)
  description: 'Experience authentic Italian cuisine in a cozy atmosphere. Our chefs use only the finest ingredients to create memorable dining experiences.',
  openingHours: '11:00 AM - 10:00 PM',
};

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

function RestaurantDetail() {
  const navigate = useNavigate();
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
  });

  const handleChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement reservation logic
    console.log('Reservation attempt:', reservationData);
    navigate('/reservation');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {mockRestaurant.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={mockRestaurant.rating} precision={0.5} readOnly />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  ({mockRestaurant.rating})
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography>{mockRestaurant.location}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography>{mockRestaurant.openingHours}</Typography>
              </Box>
              <Typography variant="body1" paragraph>
                {mockRestaurant.description}
              </Typography>
              
              {/* Google Maps Integration */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Location
                </Typography>
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={mockRestaurant.coordinates}
                    zoom={15}
                  >
                    <Marker position={mockRestaurant.coordinates} />
                  </GoogleMap>
                </LoadScript>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Make a Reservation
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  type="date"
                  name="date"
                  label="Date"
                  value={reservationData.date}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  type="time"
                  name="time"
                  label="Time"
                  value={reservationData.time}
                  onChange={handleChange}
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  fullWidth
                  select
                  name="guests"
                  label="Number of Guests"
                  value={reservationData.guests}
                  onChange={handleChange}
                  margin="normal"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option} {option === 1 ? 'Guest' : 'Guests'}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  name="specialRequests"
                  label="Special Requests"
                  value={reservationData.specialRequests}
                  onChange={handleChange}
                  margin="normal"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3 }}
                >
                  Book Table
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default RestaurantDetail; 