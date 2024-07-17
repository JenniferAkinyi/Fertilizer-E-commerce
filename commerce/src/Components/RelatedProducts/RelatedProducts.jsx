import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import { Item } from '../Item/Item'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const RelatedProducts = () => {

  const [firebaseProducts, setFirebaseProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Products/Fertilizer/Available"));
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFirebaseProducts(productsList.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Assuming you have a method to get the current product from context or props
    setCurrentProduct(/* Your logic to get the current product */);

  }, []);

    // Filter out the current product
    const relatedProducts = firebaseProducts.filter(item => item.id !== currentProduct?.id);

  return (
    <div className='relatedproduts'>
        <h1>Related Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            {relatedProducts.map((item, i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} price={item.price}/>
            }
        )}
        </div>
    </div>
  )
}