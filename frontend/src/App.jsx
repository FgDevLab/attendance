import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './views/Login';
import Home from './views/Home';
import Clockin from './views/Clockin';
import Clockout from './views/Clockout';
import Account from './views/Account';

const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('auth-token');
  const role = Cookies.get("auth-role")

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          Cookies.set('location', `${latitude},${longitude}`, { expires: 1 });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (token && role === "employee") {
      getUserLocation();
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const token = Cookies.get('auth-token');

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/clockin" element={
          <ProtectedRoute>
            <Clockin />
          </ProtectedRoute>
        } />
        <Route path="/clockout" element={
          <ProtectedRoute>
            <Clockout />
          </ProtectedRoute>
        } />
         <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
