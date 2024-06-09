import React from 'react'
import './Products.css'
import products from '../Assets/products'
import { Item } from '../Item/Item'

export const Products = () => {
  return (
    <div className='products'>
        <h1>Popular Among Farmers</h1>
        <hr />
        <div className='collections'>
            {products.map((item, i) =>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
            })}

        </div>

    </div>
  )
}
