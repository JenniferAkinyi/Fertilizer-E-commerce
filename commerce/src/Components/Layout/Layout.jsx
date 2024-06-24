// src/Layout.jsx
import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import AdminNav from '../../Admin/AdminNav';
import { UserContext } from '../../Context/UserContext';

const Layout = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log('User:', user);
  }, [user]);
 
  return (
    <>
      {user && user.role === 'admin' ? <AdminNav /> : <Navbar />}
      
      <div className="main-content">
        <Outlet />
      </div>
      
      <Footer />
    </>
  );
};

export default Layout;
