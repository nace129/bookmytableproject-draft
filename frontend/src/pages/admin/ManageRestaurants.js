import React, { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const dummyRestaurants = [
  {
    id: 'MTSW4McQd7CbVtyjqoe9mw',
    name: 'St Honore Pastries',
    cuisine: 'Bubble Tea, Coffee & Tea, Bakeries',
    bookings_today: 5,
  },
  {
    id: 'CF33F8-E6oudUQ46HnavjQ',
    name: 'Sonic Drive-In',
    cuisine: 'Burgers, Fast Food, Sandwiches',
    bookings_today: 3,
  },
  {
    id: 'k0hlBqXX-Bt0vf1op7op7Jr1w',
    name: "Tsevi's Pub And Grill",
    cuisine: 'Pubs, American (Traditional), Greek',
    bookings_today: 8,
  },
];

export default function ManageRestaurants() {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // TODO: replace with fetch('/api/restaurants')
    setList(dummyRestaurants);
  }, []);

  // memoize filtered list
  const filtered = useMemo(() => {
    const lc = searchTerm.toLowerCase();
    return list.filter(
      (r) =>
        r.name.toLowerCase().includes(lc) ||
        r.cuisine.toLowerCase().includes(lc)
    );
  }, [list, searchTerm]);

  const handleRemove = (id) => {
    // TODO: call DELETE /api/restaurants/:id
    setList((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <Card sx={{ my: 4 }}>
      <CardContent>
        {/* <Typography variant="h5" gutterBottom>
          Manage Restaurants
        </Typography> */}

        {/* Search field */}
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Search restaurants..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Restaurant Name</TableCell>
                <TableCell>Cuisine</TableCell>
                <TableCell align="right">Bookings Today</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.cuisine}</TableCell>
                  <TableCell align="right">{r.bookings_today}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleRemove(r.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    No restaurants match “{searchTerm}”
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
