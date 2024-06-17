// src/Navbar.js
import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.png';
import profile_pic from '../Assets/profile.png';
import cart_icon from '../Assets/cart.png';
import { ShopContext } from '../../Context/ShopContext';
import { UserContext } from '../../Context/UserContext';
import { getDownloadURL, ref, getStorage } from 'firebase/storage';

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const [profilePicture, setProfilePicture] = useState('');
  const { user } = useContext(UserContext);
  const storage = getStorage();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const storageRef = ref(storage, `profilePictures/${user.uid}`);
      getDownloadURL(storageRef)
        .then((url) => {
          setProfilePicture(url);
        })
        .catch((error) => {
          console.error('Error retrieving profile picture:', error);
        });
    }
  }, [user, storage]);

  if (location.pathname.startsWith('/admin')) {
    return null; // Don't render Navbar for admin routes
  }

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt='' style={{ width: '70px', height: 'auto' }} />
        <p>THE DIGITAL FARMER</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("nitrates") }}><Link style={{ textDecoration: 'none' }} to='/nitrates'>Nitrogen</Link>{menu === "nitrates" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("phosphates") }}><Link style={{ textDecoration: 'none' }} to='/phosphates'>Phosphorus</Link>{menu === "phosphates" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("potassiums") }}><Link style={{ textDecoration: 'none' }} to='/potassiums'>Potassium</Link>{menu === "potassiums" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("organics") }}><Link style={{ textDecoration: 'none' }} to='/organics'>Organic</Link>{menu === "organics" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("npks") }}><Link style={{ textDecoration: 'none' }} to='/npks'>NPK</Link>{menu === "npks" ? <hr /> : <></>}</li>
      </ul>
      <div className='nav-login-cart'>
        <Link to='/cart'><img src={cart_icon} alt='' /></Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
        {!user ? (
          <div>
            <Link to='/login'><button>LogIn</button></Link>
          </div>
        ) : (
          <div className='user-profile'>
            <Link to='/profile'>
              <span><img src={profilePicture || profile_pic} alt="Profile" /></span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
