import React, { useState, useEffect } from 'react';
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
  Chip,
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import restaurantData from '../data/restaurants.json';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

function RestaurantDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: 2,
    specialRequests: '',
  });

  useEffect(() => {
    const foundRestaurant = restaurantData.find(r => r.id === id);
    if (foundRestaurant) {
      setRestaurant(foundRestaurant);
    }
  }, [id]);

  const handleChange = (e) => {
    setReservationData({
      ...reservationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTimeSlotClick = (timeSlot) => {
    setSelectedTime(timeSlot);
    setReservationData(prev => ({
      ...prev,
      time: timeSlot.time,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation attempt:', reservationData);
    navigate('/reservation');
  };

  const getCostRating = (rating) => {
    return '$'.repeat(rating);
  };

  if (!restaurant) {
    return <Typography>Restaurant not found</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {restaurant.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <Rating value={restaurant.rating} precision={0.5} readOnly />
                <Typography variant="body1">
                  ({restaurant.rating}) • {restaurant.num_reviews} reviews
                </Typography>
                <Chip label={getCostRating(restaurant.cost_rating)} color="primary" />
              </Box>

              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {restaurant.cuisine}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOnIcon sx={{ mr: 1 }} />
                <Typography>
                  {restaurant.location.city}, {restaurant.location.state} {restaurant.location.zip}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography>Bookings Today: {restaurant.bookings_today}</Typography>
              </Box>

              {/* Google Maps Integration */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Location
                </Typography>
                <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={restaurant.coords}
                    zoom={15}
                  >
                    <Marker position={restaurant.coords} />
                  </GoogleMap>
                </LoadScript>
              </Box>

              {/* Time Slots */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Available Time Slots
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {restaurant.table_layout.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime?.time === slot.time ? "contained" : "outlined"}
                      onClick={() => handleTimeSlotClick(slot)}
                      disabled={slot.available === 0}
                    >
                      {slot.time} ({slot.available} available)
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Reviews Section */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Reviews
                </Typography>
                {restaurant.reviews.map((review, index) => (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle2">User: {review.user}</Typography>
                        <Rating value={review.rating} readOnly size="small" />
                      </Box>
                      <Collapse in={expandedReview === index}>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {review.comment}
                        </Typography>
                      </Collapse>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => setExpandedReview(expandedReview === index ? null : index)}
                        sx={{ transform: expandedReview === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
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