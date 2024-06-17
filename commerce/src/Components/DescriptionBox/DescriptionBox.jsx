import React from 'react'
import './DescriptionBox.css'
export const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews {14}</div>
      </div>
      <div className="de
      scriptionbox-description">
        <p>The Digital Farmer is an online platform that facilitates buying and selling 
          of fertilizers over the internet as a virtual marketplace where businesses and individuals
          showcase their produts,interact with customers and conduct transactions without the need for a physical presence.
        </p>
      </div>
    </div>
  )
}
