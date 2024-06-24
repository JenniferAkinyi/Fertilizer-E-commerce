import React, { useEffect, useState } from 'react';
import './CSS/ShopCategory.css';
import { Item } from '../Components/Item/Item';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const ShopCategory = () => {
  const [firebaseProducts, setFirebaseProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products/Fertilizer/Available"));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFirebaseProducts(productsList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
          <h1>ALL FERTILIZERS</h1>
      </div>
      <div className="shopcategory-products">
        {firebaseProducts.length > 0 ? (
          firebaseProducts.map((item, i) => (
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
