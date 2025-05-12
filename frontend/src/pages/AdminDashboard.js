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
  Tabs,
  Tab,
  Alert,
  MenuItem,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [restaurants, setRestaurants] = useState([]);
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [dialogType, setDialogType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 0) {
        // TODO: Replace with actual API call
        const response = await fetch('/api/restaurants');
        const data = await response.json();
        setRestaurants(data);
      } else {
        // TODO: Replace with actual API call
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    }
  };

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    try {
      if (dialogType === 'restaurant') {
        // TODO: Replace with actual API call
        await fetch('/api/restaurants', {
          method: selectedItem ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedItem),
        });
        setSuccess('Restaurant saved successfully');
      } else {
        // TODO: Replace with actual API call
        await fetch('/api/users', {
          method: selectedItem ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedItem),
        });
        setSuccess('User saved successfully');
      }
      setOpenDialog(false);
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save data');
    }
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/restaurants/${restaurantId}`, {
        method: 'DELETE',
      });
      setSuccess('Restaurant deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      setError('Failed to delete restaurant');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // TODO: Replace with actual API call
      await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });
      setSuccess('User deleted successfully');
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
          <Tab label="Restaurants" />
          <Tab label="Users" />
        </Tabs>

        {activeTab === 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('restaurant')}
                >
                  Add Restaurant
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Manager</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {restaurants.map((restaurant) => (
                      <TableRow key={restaurant.id}>
                        <TableCell>{restaurant.name}</TableCell>
                        <TableCell>{restaurant.manager}</TableCell>
                        <TableCell>{restaurant.status}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenDialog('restaurant', restaurant)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDeleteRestaurant(restaurant.id)}>
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
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog('user')}
                >
                  Add User
                </Button>
              </Box>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>{user.status}</TableCell>
                        <TableCell>
                          <IconButton color="primary" onClick={() => handleOpenDialog('user', user)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDeleteUser(user.id)}>
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
        )}
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {selectedItem ? 'Edit' : 'Add'} {dialogType === 'restaurant' ? 'Restaurant' : 'User'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'restaurant' ? (
            <>
              <TextField
                fullWidth
                label="Name"
                value={selectedItem?.name || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Manager"
                value={selectedItem?.manager || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, manager: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Status"
                select
                value={selectedItem?.status || 'active'}
                onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                margin="normal"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </TextField>
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Name"
                value={selectedItem?.name || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedItem?.email || ''}
                onChange={(e) => setSelectedItem({ ...selectedItem, email: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Role"
                select
                value={selectedItem?.role || 'customer'}
                onChange={(e) => setSelectedItem({ ...selectedItem, role: e.target.value })}
                margin="normal"
              >
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="restaurant_manager">Restaurant Manager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
              <TextField
                fullWidth
                label="Status"
                select
                value={selectedItem?.status || 'active'}
                onChange={(e) => setSelectedItem({ ...selectedItem, status: e.target.value })}
                margin="normal"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard; 