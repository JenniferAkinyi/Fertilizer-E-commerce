import React, {useContext} from 'react';
import './CSS/ShopCategory.css';
import { ShopContext} from '../Context/ShopContext';
import {Item} from '../Components/Item/Item';

export const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);

  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
          <h1>ALL FERTILIZERS</h1>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if( props.category === item.category){
            return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} new_price={item.new_price} old_price={item.old_price} />
          }
          else{
            return null;
          }

        })}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}
export default ShopCategory;