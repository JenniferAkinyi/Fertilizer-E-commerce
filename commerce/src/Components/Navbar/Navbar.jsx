import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../Assets/logo.jpeg';
import cart_icon from '../Assets/cart.png';
import message from '../Assets/message.png';
import { ShopContext } from '../../Context/ShopContext';
import { UserContext } from '../../Context/UserContext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, categories } = useContext(ShopContext);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [unviewedCount, setUnviewedCount] = useState(0);
  
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const db = getFirestore();
      const announcementsCol = collection(db, 'Announcements');
      const announcementsSnapshot = await getDocs(announcementsCol);
      const announcementsList = announcementsSnapshot.docs.map(doc => doc.data());
      console.log('Fetched Announcements:', announcementsList); // Log fetched announcements
      setAnnouncements(announcementsList);
    
      // Check local storage for viewed announcements
      const viewedAnnouncements = JSON.parse(localStorage.getItem('viewedAnnouncements')) || [];
      // Update viewed status in announcements list
      const updatedAnnouncements = announcementsList.map(announcement => ({
        ...announcement,
        viewed: viewedAnnouncements.includes(announcement.id)
      }));
      setAnnouncements(updatedAnnouncements);

      // Count unviewed announcements
      const unviewed = updatedAnnouncements.filter(announcement => !announcement.viewed);
      setUnviewedCount(unviewed.length);
    };

    fetchAnnouncements();
  }, []);

  console.log('Announcements state:', announcements); // Log announcements state

  if (location.pathname.startsWith('/dashboard')) {
    return null; // Don't render Navbar for admin routes
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAnnouncementClick = (id) => {
    // Update local storage to mark announcement as viewed
    let viewedAnnouncements = JSON.parse(localStorage.getItem('viewedAnnouncements')) || [];
    if (!viewedAnnouncements.includes(id)) {
      viewedAnnouncements.push(id);
      localStorage.setItem('viewedAnnouncements', JSON.stringify(viewedAnnouncements));

      // Update viewed status in state and count
      const updatedAnnouncements = announcements.map(announcement => {
        if (announcement.id === id) {
          return { ...announcement, viewed: true };
        }
        return announcement;
      });
      setAnnouncements(updatedAnnouncements);

      const unviewed = updatedAnnouncements.filter(announcement => !announcement.viewed);
      setUnviewedCount(unviewed.length);
    }
  };

  if (location.pathname.startsWith('/dashboard')) {
    return null; // Don't render Navbar for admin routes
  }

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={logo} alt='' style={{ width: '70px', height: 'auto' }} />
        <p>THE DIGITAL FARMER</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu("shop") }}>
          <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li className='nav-category dropdown' onClick={toggleDropdown}>
          <p>Categories</p>
          {isDropdownOpen && (
            <ul className='dropdown-menu'>
              {categories.map(category => (
                <li key={category.id} onClick={() => { setMenu(category.id) }}>
                  <Link to={`/${category.name}`} onClick={() => setIsDropdownOpen(false)}>
                    {category.name}
                  </Link>
                  {menu === category.id ? <hr /> : <></>}
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
      <div className="message">
        <Link to='/announcements'><img src={message} alt="" /></Link>
        <div className="message-count">{unviewedCount}</div>
      </div>
      <div className='nav-login-cart'>
        <Link to='/cart'><img src={cart_icon} alt='' /></Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
        {!user ? (
          <div>
            <Link to='/login'><button>LogIn</button></Link>
          </div>
        ) : (
          <div className='user-greeting'>
            <Link to='/profile'><span>Welcome, {user.displayName || "User"}</span></Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
