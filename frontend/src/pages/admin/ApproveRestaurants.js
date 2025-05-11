import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';

const dummyPending = [
  {
    id: 'NEW1',
    name: 'La Taqueria',
    cuisine: 'Mexican, Tacos',
  },
  {
    id: 'NEW2',
    name: 'Sushi World',
    cuisine: 'Japanese, Sushi Bars',
  },
];

export default function ApproveRestaurants() {
  const [pending, setPending] = useState([]);

  useEffect(() => {
    // TODO: replace with fetch('/api/restaurants/pending')
    setPending(dummyPending);
  }, []);

  const handleApprove = (id) => {
    // TODO: call POST /api/restaurants/:id/approve
    setPending((prev) => prev.filter((r) => r.id !== id));
    alert(`Approved ${id}`);
  };

  const handleReject = (id) => {
    // TODO: call POST /api/restaurants/:id/reject
    setPending((prev) => prev.filter((r) => r.id !== id));
    alert(`Rejected ${id}`);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cuisine</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pending.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.cuisine}</TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleApprove(r.id)}
                    sx={{ mr: 1 }}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => handleReject(r.id)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
