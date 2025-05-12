// src/pages/admin/AnalyticsDashboard.js

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Dummy daily counts for last 14 days
const dailyStats = [
  { date: 'Apr 1', count: 12 },
  { date: 'Apr 2', count: 8 },
  { date: 'Apr 3', count: 10 },
  { date: 'Apr 4', count: 9 },
  { date: 'Apr 5', count: 21 },
  { date: 'Apr 6', count: 26 },
  { date: 'Apr 7', count: 18 },
  { date: 'Apr 8', count: 15 },
  { date: 'Apr 9', count: 11 },
  { date: 'Apr 10', count: 18 },
  { date: 'Apr 11', count: 22 },
  { date: 'Apr 12', count: 28 },
  { date: 'Apr 13', count: 16 },
  { date: 'Apr 14', count: 14 },
];

// Dummy reservation totals by restaurant
const restaurantStats = [
  { name: 'St Honore Pastries', count: 34 },
  { name: 'Sonic Drive-In',     count: 27 },
  { name: "Tsevi's Pub And Grill", count: 19 },
  { name: 'La Taqueria',        count: 22 },
  { name: 'Sushi World',        count: 17 },
];

export default function AnalyticsDashboard() {
  const [daily, setDaily] = useState([]);
  const [byRestaurant, setByRestaurant] = useState([]);

  useEffect(() => {
    // TODO: fetch your real analytics endpoints
    // e.g. 
    // fetch('/api/analytics/daily?lastMonth=true').then(r=>r.json()).then(setDaily)
    // fetch('/api/analytics/by-restaurant?lastMonth=true').then(r=>r.json()).then(setByRestaurant)
    setDaily(dailyStats);
    setByRestaurant(restaurantStats);
  }, []);

  return (
    <Grid container spacing={4} sx={{ my: 2 }}>
      
      {/* Daily Counts Chart */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Daily Reservations (Last Month)
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={daily}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#1976d2" barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Totals by Restaurant */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Reservations by Restaurant (Last Month)
            </Typography>
            <TableContainer component={Paper}>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>Restaurant</TableCell>
                    <TableCell align="right">Reservation Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {byRestaurant.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="right">{row.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
      
    </Grid>
  );
}