import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import RoleBasedLayout from './layouts/RoleBasedLayout';
import Home from './pages/Home';
import theme from './theme';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import RestaurantList from './pages/RestaurantList';
import RestaurantDetail from './pages/RestaurantDetail';
import Reservation from './pages/Reservation';
import Profile from './pages/Profile';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/restaurants" element={<RestaurantList />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard/*" element={<RoleBasedLayout />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App; 