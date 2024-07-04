import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { Product } from './Pages/Product';
import { ShopCategory } from './Pages/ShopCategory';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import { Delivery } from './Components/Delivery/Delivery';
import { Cart } from './Pages/Cart';
import { UserProvider } from './Context/UserContext';
import Profile from './Components/Profile/Profile';
import Layout from './Components/Layout/Layout';


function App() {
  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Shop />} />
              <Route path="/:category" element={<ShopCategory />} />
              <Route path="product/:productid" element={<Product />} />
              <Route path="cart" element={<Cart />} />
              <Route path="profile" element={<Profile />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="delivery" element={<Delivery />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;