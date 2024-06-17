import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './Context/UserContext';

const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  // If no user is logged in, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if the user has the 'admin' role
  if (user.role === 'admin') {
    return <Outlet />;
  }

  // If user is not an admin, redirect to the home page
  return <Navigate to="/" />;
};

export default ProtectedRoute;
