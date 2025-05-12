import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import restaurantsData from '../data/restaurants.json';

export default function RestaurantManagerDashboard() {
  // Restaurant info state
  const [info, setInfo] = useState({
    name: '',
    address: '',
    contact: '',
    openingTime: '',
    closingTime: '',
    description: '',
    tableLayout: [],
    photos: []
  });

  // Reservation state
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // UI state
  const [error, setError] = useState('');
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    // Load the first restaurant from JSON as an example
    if (restaurantsData.length > 0) {
      const restaurant = restaurantsData[0];
      const address = restaurant.location
        ? `${restaurant.location.city}, ${restaurant.location.state}, ${restaurant.location.zip}`
        : `Near coordinates (${restaurant.coords?.lat.toFixed(2)}, ${restaurant.coords?.lng.toFixed(2)})`;
      setInfo({
        name: restaurant.name,
        address: address,
        contact: restaurant.contact || 'No contact info',
        openingTime: '09:00', // Default opening time
        closingTime: '22:00', // Default closing time
        description: restaurant.description || 'No description available',
        tableLayout: restaurant.table_layout || [],
        photos: []
      });
    }
  }, []);

  // Load reservations on date change
  useEffect(() => {
    async function fetchReservations() {
      try {
        // TODO: Replace with real API call
        const data = []; // await fetch(`/api/reservations?date=${selectedDate.toISOString()}`).then(r=>r.json());
        setReservations(data);
      } catch (e) {
        setError('Failed to fetch reservations');
      }
    }
    fetchReservations();
  }, [selectedDate]);

  // Handlers for edit dialog
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleInfoChange = (field, value) => {
    setInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    setInfo(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };
  const removePhoto = (index) => {
    setInfo(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSlotChange = (index, field, value) => {
    setInfo(prev => {
      const copy = [...prev.tableLayout];
      copy[index] = { ...copy[index], [field]: value };
      return { ...prev, tableLayout: copy };
    });
  };
  const addSlot = () => {
    setInfo(prev => ({
      ...prev,
      tableLayout: [...prev.tableLayout, { time: '', maxSeats: '' }]
    }));
  };
  const removeSlot = (index) => {
    setInfo(prev => ({
      ...prev,
      tableLayout: prev.tableLayout.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    try {
      // TODO: PUT /api/restaurant with form data (info + photos)
      setOpenEdit(false);
    } catch (e) {
      setError('Failed to save restaurant information');
    }
  };

  return (
    <Container maxWidth="lg" style={{ paddingTop: "30px" }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Restaurant Info Card */}
      <Card sx={{ mb: 4, p: 2, position: 'relative' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h4">{info.name}</Typography>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={handleEditOpen}
            >
              Edit Restaurant
            </Button>
          </Box>
          <Typography sx={{ mt: 1 }}>Address: {info.address}</Typography>
          <Typography>Contact: {info.contact}</Typography>
          <Typography>
            Hours: {info.openingTime} – {info.closingTime}
          </Typography>
          <Typography sx={{ mt: 2 }}>{info.description}</Typography>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5">Reservations</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={setSelectedDate}
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
            {reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  No reservations for selected date
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.time}</TableCell>
                  <TableCell>{r.customerName}</TableCell>
                  <TableCell>{r.partySize}</TableCell>
                  <TableCell>{r.status}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Restaurant Dialog */}
      <Dialog open={openEdit} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Restaurant Information</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Restaurant Name"
            value={info.name}
            onChange={(e) => handleInfoChange('name', e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            value={info.address}
            onChange={(e) => handleInfoChange('address', e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contact Info"
            value={info.contact}
            onChange={(e) => handleInfoChange('contact', e.target.value)}
          />

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Opening Time"
                type="time"
                value={info.openingTime}
                onChange={(e) => handleInfoChange('openingTime', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Closing Time"
                type="time"
                value={info.closingTime}
                onChange={(e) => handleInfoChange('closingTime', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            multiline
            rows={3}
            value={info.description}
            onChange={(e) => handleInfoChange('description', e.target.value)}
          />

          <Typography variant="subtitle1" sx={{ mt: 2 }}>Photos</Typography>
          <Button variant="outlined" component="label">
            Upload Photos
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
            />
          </Button>
          <Box sx={{ mt: 1 }}>
            {info.photos.map((file, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <Typography sx={{ flexGrow: 1 }}>{file.name}</Typography>
                <IconButton size="small" onClick={() => removePhoto(idx)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>Table Layout</Typography>
          {info.tableLayout.map((slot, idx) => (
            <Grid container spacing={2} alignItems="center" key={idx} sx={{ mt: 1 }}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Time"
                  type="time"
                  value={slot.time}
                  onChange={(e) => handleSlotChange(idx, 'time', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Max Seats"
                  type="number"
                  value={slot.maxSeats}
                  onChange={(e) => handleSlotChange(idx, 'maxSeats', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton color="error" onClick={() => removeSlot(idx)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            startIcon={<AddIcon />}
            sx={{ mt: 2 }}
            onClick={addSlot}
          >
            Add Slot
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}