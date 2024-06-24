import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure correct Firebase setup import
import { collection, getDocs } from "firebase/firestore";

export const ShopContext = createContext(null);

const getDefaultCart = (products) => {
  let cart = {};
  products.forEach(product => {
    cart[product.id] = 0;
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [allProduct, setAllProduct] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'Products/Fertilizer/Available');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAllProduct(productList);
        setFilteredProducts(productList);
        setCartItems(getDefaultCart(productList));

        // Fetch categories if needed
        // const categoriesCollection = collection(db, 'Products/Fertilizer/Categories');
        // const categorySnapshot = await getDocs(categoriesCollection);
        // const categoryList = categorySnapshot.docs.map(doc => doc.id); // Assuming categories are the document IDs
        // setCategories(categoryList);

      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    const filterProductsByCategory = (category) => {
      if (category === 'all') {
        setFilteredProducts(allProduct);
      } else {
        const filtered = allProduct.filter(product => product.category === category.name);
        setFilteredProducts(filtered);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesCollection = collection(db, 'Products/Fertilizer/Categories');
        const categorySnapshot = await getDocs(categoriesCollection);
        const categoryList = categorySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching categories: ', error);
      }
    }

    fetchProducts();
    fetchCategories();
  }, []);

  const addToCart = (itemId, quantity) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProduct.find((product) => product.id === item);
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
    allProduct,
    filteredProducts, 
    // filterProductsByCategory,
    categories,
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
