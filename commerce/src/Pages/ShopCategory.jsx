import React, { useContext, useEffect } from 'react';
import './CSS/ShopCategory.css';
import { Item } from '../Components/Item/Item';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';

export const ShopCategory = () => {
  const { category } = useParams();
  const { filteredProducts, filterProductsByCategory } = useContext(ShopContext);

  useEffect(() => {
    console.log("Current Category:", category); // Debug line
    filterProductsByCategory(category);
  }, [category, filterProductsByCategory]);

  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
        <h1>{category.toUpperCase()}</h1>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item, i) => (
            <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      <div className="shopcategory-loadmore">
        Explore More
      </div>
    </div>
  );
}

export default ShopCategory;
