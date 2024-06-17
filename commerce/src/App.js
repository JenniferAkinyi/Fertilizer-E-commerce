// src/App.js
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { ShopCategory } from './Pages/ShopCategory';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import { Delivery } from './Components/Delivery/Delivery';
import { Cart } from './Pages/Cart';
import { Footer } from './Components/Footer/Footer';
import { UserProvider } from './Context/UserContext';
import Profile from './Components/Profile/Profile';
import ProtectedRoute from './ProtectedRoute';

import AddProducts from './Admin/AddProducts';
import AllProducts from './Admin/AllProducts';
import Dashboard from './Admin/Dashboard';

function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            
            <Route path='/' element={<Shop />} />
            <Route path='/nitrates' element={<ShopCategory category="nitrate" />} />
            <Route path='/phosphates' element={<ShopCategory category="phosphate" />} />
            <Route path='/potassiums' element={<ShopCategory category="potassium" />} />
            <Route path='/organics' element={<ShopCategory category="organic" />} />
            <Route path='/npks' element={<ShopCategory category="npk" />} />
            <Route path="/product" element={<Product />}>
              <Route path=':productid' element={<Product />} />
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path='/login' element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Login />} />

            <Route path='/*' element={<ProtectedRoute/>}>
              
              <Route path="delivery" element={<Delivery />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dashboard/all-products" element={<AllProducts/>} />
              <Route path="dashboard/all-products" element={<AddProducts />} />
            </Route>


          </Routes>
         <Footer />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
