import React from 'react'
import './Delivery.css'

export const Delivery = () => {
  return (
    
    <div className='delivery'>
      <div className="delivery-container">
        <h1>Checkout</h1>
        <p>My Details</p>
        <div className="delivery-fields">
          <input type="text" placeholder='Phone Number'/>
          <input type="text" placeholder='County'/>
          <input type="text" placeholder='Sub County'/>
        </div>
        <button>Pay Now</button>
      </div>
    </div>
  )
}
