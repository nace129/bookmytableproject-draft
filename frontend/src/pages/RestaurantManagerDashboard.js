import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const RestaurantManagerDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [error, setError] = useState('');
  const [restaurantInfo, setRestaurantInfo] = useState({
    name: 'My Restaurant',
    capacity: 50,
    openingTime: '09:00',
    closingTime: '22:00',
  });

  useEffect(() => {
    fetchReservations();
  }, [selectedDate]);

  const fetchReservations = async () => {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/reservations?date=${selectedDate.toISOString()}`);
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError('Failed to fetch reservations');
    }
  };

  const handleEditRestaurant = () => {
    setOpenDialog(true);
  };

  const handleSaveRestaurant = async () => {
    try {
      // TODO: Replace with actual API call
      await fetch('/api/restaurant', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restaurantInfo),
      });
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating restaurant:', error);
      setError('Failed to update restaurant information');
    }
  };

  const handleEditReservation = (reservation) => {
    setSelectedReservation(reservation);
    setOpenDialog(true);
  };

  const handleDeleteReservation = async (reservationId) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
      });
      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setError('Failed to delete reservation');
    }
  };

  const handleSaveReservation = async () => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/reservations/${selectedReservation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedReservation),
      });
      setOpenDialog(false);
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
      setError('Failed to update reservation');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4">{restaurantInfo.name}</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={handleEditRestaurant}
                  >
                    Edit Restaurant
                  </Button>
                </Box>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Capacity: {restaurantInfo.capacity} seats
                </Typography>
                <Typography variant="body1">
                  Operating Hours: {restaurantInfo.openingTime} - {restaurantInfo.closingTime}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">Reservations</Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Party Size</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.customerName}</TableCell>
                      <TableCell>{reservation.partySize}</TableCell>
                      <TableCell>{reservation.status}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEditReservation(reservation)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteReservation(reservation.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedReservation ? 'Edit Reservation' : 'Edit Restaurant Information'}
        </DialogTitle>
        <DialogContent>
          {selectedReservation ? (
            <>
              <TextField
                fullWidth
                label="Customer Name"
                value={selectedReservation.customerName}
                onChange={(e) =>
                  setSelectedReservation({ ...selectedReservation, customerName: e.target.value })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Party Size"
                type="number"
                value={selectedReservation.partySize}
                onChange={(e) =>
                  setSelectedReservation({ ...selectedReservation, partySize: parseInt(e.target.value) })
                }
                margin="normal"
              />
              <TextField
                fullWidth
                label="Status"
                select
                value={selectedReservation.status}
                onChange={(e) =>
                  setSelectedReservation({ ...selectedReservation, status: e.target.value })
                }
                margin="normal"
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </TextField>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Restaurant Name"
                value={restaurantInfo.name}
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, name: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Capacity"
                type="number"
                value={restaurantInfo.capacity}
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, capacity: parseInt(e.target.value) })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Opening Time"
                type="time"
                value={restaurantInfo.openingTime}
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, openingTime: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Closing Time"
                type="time"
                value={restaurantInfo.closingTime}
                onChange={(e) => setRestaurantInfo({ ...restaurantInfo, closingTime: e.target.value })}
                margin="normal"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={selectedReservation ? handleSaveReservation : handleSaveRestaurant}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RestaurantManagerDashboard; 