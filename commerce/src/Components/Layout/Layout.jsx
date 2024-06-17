// src/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { AdminNav } from '../Admin/AdminNav';


const Layout = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname.startsWith('/dashboard') ? <AdminNav /> : <Navbar />}
      
      <div className="main-content">
        <Outlet />
      </div>
      
      <Footer />
    </>
  );
};

export default Layout;
