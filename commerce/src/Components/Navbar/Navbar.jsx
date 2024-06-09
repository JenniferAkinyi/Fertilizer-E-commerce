import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart.png'
import { ShopContext } from '../../Context/ShopContext';
export const Navbar = () => {
    const [menu,setMenu] = useState("shop")
    const {getTotalCartItems} = useContext(ShopContext)

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt='' style={{ width: '70px', height: 'auto' }}/>
            <p>THE DIGITAL FARMER</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("shop")}}><Link style={{ textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("nitrates")}}><Link style={{ textDecoration: 'none'}} to='/nitrates'>Nitrogen</Link>{menu==="nitrates"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("phosphates")}}><Link style={{ textDecoration: 'none'}} to='/phosphates'>Phosphorus</Link>{menu==="phosphates"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("potassiums")}}><Link style={{ textDecoration: 'none'}} to='/potassiums'>Potassium</Link>{menu==="potassiums"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("organics")}}><Link style={{ textDecoration: 'none'}} to='/organics'>Organic</Link>{menu==="organics"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("npks")}}><Link style={{ textDecoration: 'none'}} to='/npks'>NPK</Link>{menu==="npks"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
            <Link to='/login'><button>LogIn</button></Link>
            <Link to='/cart'><img src={cart_icon} alt=''/></Link>
            <div className='nav-cart-count'>{getTotalCartItems()}</div>
        </div>
    </div>
  )
}


