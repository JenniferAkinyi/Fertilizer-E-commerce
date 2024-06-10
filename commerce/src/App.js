
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {Shop} from './Pages/Shop'
import {Product} from './Pages/Product'
import { ShopCategory } from './Pages/ShopCategory';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import {Cart} from './Pages/Cart';
import { Footer } from './Components/Footer/Footer';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/nitrates' element={<ShopCategory  category="nitrate"/>}/>
        <Route path='/phosphates' element={<ShopCategory category="phosphate"/>}/>
        <Route path='/potassiums' element={<ShopCategory category="potassium"/>}/>
        <Route path='/organics' element={<ShopCategory  category="organic"/>}/>
        <Route path='/npks' element={<ShopCategory  category="npk"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productid' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
