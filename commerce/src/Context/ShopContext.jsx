import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  for (let index = 0; index < products.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [all_product, setAllProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAllProduct(productList);
      setCartItems(getDefaultCart(productList));
    };

    fetchProducts();
  }, []);

  const addToCart = (itemId, quantity) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + quantity }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          let itemPrice = itemInfo.new_price ? parseFloat(itemInfo.new_price.replace('KSh', '')) : parseFloat(itemInfo.price.replace('KSh', ''));
          totalAmount += itemPrice * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
