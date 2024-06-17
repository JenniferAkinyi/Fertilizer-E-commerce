// src/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  // Debugging: Log user data to ensure it's correct
  console.log('ProtectedRoute - User:', user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
