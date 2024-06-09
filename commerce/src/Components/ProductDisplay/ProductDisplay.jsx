import React, { useContext, useState }from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star.png'
import star_empty from '../Assets/star_dull.png'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);

    const renderOptions = () => {
      const options = [];
      for (let i = 1; i <= 150; i++) {
        options.push(<option key={i} value={i}>{i}</option>);
      }
      return options;
    };
    const handleQuantityChange = (event) => {
      setQuantity(Number(event.target.value)); // Update quantity state
  };

  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image} alt="" />
            </div>
        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_empty} alt=""/>
                <p>(64)</p>
            </div>
            <div className="productdisplay-right-prices">
              <div className="productdisplay-right-price-old">{product.old_price}</div>
              <div className="productdisplay-right-price-new">{product.new_price}</div>
              <div className="productdisplay-right-price">{product.price}</div>
            </div>
            <div className="productdisplay-right-description">
            Boost the growth of your plants with Osho Easygro Vegetative Fertilizer, 
            specially formulated to support robust vegetative development. Ideal for a wide range of crops, this high-quality fertilizer 
            provides essential nutrients that promote lush, healthy foliage and strong stems.
            </div>
            <div className="productdisplay-right-number">
              <h1>Select Number of Bags</h1>
              <select className="productdisplay-right-select" onChange={handleQuantityChange}>
            {renderOptions()}
          </select>
            </div>
            <button onClick={()=>{addToCart(product.id, quantity)}}>ADD TO CART</button>
        </div>
        
        
    </div>
  )
}

