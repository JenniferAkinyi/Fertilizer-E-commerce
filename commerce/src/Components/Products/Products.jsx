import React, { useEffect, useState } from 'react'
import './Products.css'
import { Item } from '../Item/Item'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export const Products = () => {

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
    <div className='products'>
        <h1>Popular Among Farmers</h1>
        <hr />
        <div className='collections'>
            {firebaseProducts.map((item, i) =>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} price={item.price} />
            })}

        </div>

    </div>
  )
}
