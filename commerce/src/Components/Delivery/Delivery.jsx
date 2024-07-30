import React, { useState, useEffect,useContext } from 'react';
import './Delivery.css';
import { Link, useNavigate } from 'react-router-dom'; 
import { UserContext } from '../../Context/UserContext';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const Delivery = () => {
  const { user } = useContext(UserContext);

  const [email, setEmail] = useState(user ? user.email || '' : '');
  const [orderAddress, setOrderAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [itemCount, setItemCount] = useState(1); 
  const [itemId, setItemId] = useState(''); 
  const [productCategory, setProductCategory] = useState(''); 
  const [productName, setProductName] = useState(''); 

  const navigate = useNavigate(); 

  useEffect(() => {
    if (user) {
        setEmail(user.email || '');
    }
}, [user]);

  const handleSubmit = async () => {
    const orderDate = new Date().toISOString().split('T')[0];
    const orderTime = new Date().toISOString().split('T')[1].split('.')[0];

    console.log('Submitting order...');
    console.log({
      email,
      itemCount,
      itemId,
      orderAddress,
      orderDate,
      orderTime,
      phoneNumber,
      productCategory,
      productName,
    });


    try {
      await addDoc(collection(db, 'Orders/Customer/order'), {
        email,
        itemCount,
        itemId,
        orderAddress,
        orderDate,
        orderTime,
        phoneNumber,
        productCategory,
        productName,
      });
      console.log('Order submitted successfully');
      navigate('/'); // Use navigate to redirect to home after successful submission
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className='delivery'>
      <div className="delivery-container">
        <h1>Checkout</h1>
        <p>My Details</p>

        <div className="delivery-fields">
          <input 
            type="text" 
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Order Address'
            value={orderAddress}
            onChange={(e) => setOrderAddress(e.target.value)}
          />
          <input 
            type="text" 
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* Add more inputs for itemId, productCategory, productName if needed */}
        </div>
        <Link to='/'><button onClick={handleSubmit}>Pay Now</button></Link>
      </div>
    </div>
  );
}
