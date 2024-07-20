import React, { useState } from 'react';
import './Delivery.css';
import { Link } from 'react-router-dom';
//import { UserContext } from '../../Context/UserContext';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const Delivery = ({ user, item, itemId, productCategory, productName }) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [county, setCounty] = useState('');
  const [subCounty, setSubCounty] = useState('');
  const [email, setEmail] = useState(user ? user.email || '' : '');

  const handlePayNow = async () => {
    const orderData = {
      emailAddress: user?.email,
      
      orderAddress: `${county}, ${subCounty}`,
      orderDate: new Date().toISOString().slice(0, 10), // Current date
      orderTime: new Date().toLocaleTimeString(), // Current time
      paymentNumber: phoneNumber,
      
    };

    // Log orderData to check for undefined fields
    console.log('Order Data: ', orderData);

    // Check for undefined fields and handle them
    if (
      !orderData.emailAddress ||
      orderData.itemCount === undefined ||
      !orderData.itemId ||
      !orderData.orderAddress ||
      !orderData.paymentNumber ||
      !orderData.productCategory ||
      !orderData.productName
      ) {
        console.error('Some fields are undefined. Please provide all required information.');
        return;
        }

    try {
      const docRef = await addDoc(collection(db, 'Orders', 'Customer', 'order'), orderData);
      console.log('Order placed successfully with ID: ', docRef.id);
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error adding order: ', error);
      // Handle error, show error message to user
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
            placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder='County'
            value={county}
            onChange={(e) => setCounty(e.target.value)}
          />
          <input
            type="text"
            placeholder='Sub County'
            value={subCounty}
            onChange={(e) => setSubCounty(e.target.value)}
          />
        </div>
        <Link to='/'><button onClick={handlePayNow}>Pay Now</button></Link>
      </div>
    </div>
  );
};
