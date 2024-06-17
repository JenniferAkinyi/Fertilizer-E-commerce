import React from 'react'
import { Link, Route, Routes } from 'react-router-dom';
import ManageUsers from './ManageUser';
import ManageProducts from './ManageProducts';

export const AdminPanel = () => {
    return (
        <div>
          <h1>Admin Panel</h1>
          <nav>
            <Link to="users">Manage Users</Link>
            <Link to="products">Manage Products</Link>
          </nav>
          <Routes>
            <Route path="users" element={<ManageUsers />} />
            <Route path="products" element={<ManageProducts />} />
          </Routes>
        </div>
      );
    };
    
    export default AdminPanel;
