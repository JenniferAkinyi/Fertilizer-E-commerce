import React, {useState} from 'react'
import './Delivery.css'
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';

export const Delivery = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [county, setCounty] = useState('');
  const [subCounty, setSubCounty] = useState('');
  const [email, setEmail] = useState('');

  const handlePayNow = async () => {
    const orderData = {
      
      emailAddress: user.email, 
      itemCount: item, 
      itemId: itemId, 
      orderAddress: county, 
      orderDate: new Date().toISOString().slice(0, 10), // Current date
      orderTime: new Date().toLocaleTimeString(), // Current time
      paymentNumber: phoneNumber, 
      productCategory: productCategory, 
      productName: productName, 
      
    };


    try {
      const docRef = await db.collection('Orders').doc('Customer').collection('order').add(orderData);
      console.log("Order placed successfully with ID: ", docRef.id);
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error("Error adding order: ", error);
      // Handle error, show error message to user
    }
  };


  return (
    
    <div className='delivery'>
      <div className="delivery-container">
        <h1>Checkout</h1>
        <p>My Details</p>
        <div className="delivery-fields">
        <input type="text" placeholder='Phone Number' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <input type="text" placeholder='County' value={county} onChange={(e) => setCounty(e.target.value)} />
          <input type="text" placeholder='Sub County' value={subCounty} onChange={(e) => setSubCounty(e.target.value)} />
        </div>
        <button onClick={handlePayNow}>Pay Now</button>
      </div>
    </div>
  )
}
