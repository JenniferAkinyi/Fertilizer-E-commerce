import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
    const {getTotalCartAmount, all_product, cartItems, removeFromCart} = useContext(ShopContext);

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((product)=>{
            if(cartItems[product.id] > 0)
            {
            return(
                    <div key={product.id}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={product.image} alt={product.name} className='carticon-product-icon'/>
                            <p>{product.name}</p>
                            <p>{product.new_price ? product.new_price : product.price}</p>
                            <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                            <p>{(product.new_price ? parseFloat(product.new_price.replace('KSh', '')) : parseFloat(product.price.replace('KSh', ''))) * cartItems[product.id]}</p>
                            <img src={remove_icon} onClick={()=>{removeFromCart(product.id)}} alt="Remove" className='cartitems-remove-icon'/>
                        </div>
                        <hr/>
                    </div>
        )}
        else {
            return null;
        }
        })}
        <div className="cartitems-down">
            <div className="classitems-total">
                <h1>Cart Total</h1>
            <div>
                <div className="classitems-total-item">
                    <p>SubTotal</p>
                    <p>{getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <p>Delivery Fee</p>
                    <p>{0}</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>{getTotalCartAmount()}</h3>
                </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
        </div>
    </div>
</div>
  )
}
