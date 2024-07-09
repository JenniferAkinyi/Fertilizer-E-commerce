import React, { createContext, useState, useEffect, useCallback } from "react";
import { db } from "../firebase"; 
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

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'Products/Fertilizer/Available');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => { 
        const data = doc.data();
        console.log("Fetched Product Data:", data)
        return { id: doc.id, ...data };
      });
      setAllProduct(productList);
      setFilteredProducts(productList); // Initialize filteredProducts with all products
      setCartItems(getDefaultCart(productList));
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  // Fetch categories from Firestore
  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(db, 'Products/Fertilizer/Categories');
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoryList = categorySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log("Fetched Category Data:", data)
        return { id: doc.id, name: data.name };
      });
      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  };

  useEffect(() => {
    console.log("Fetching products and categories");
    fetchProducts();
    fetchCategories();
  }, []);

  // Filter products based on category
  const filterProductsByCategory = useCallback((category) => {
    console.log("Filtering products by category:", category);
    const filtered = category === 'all'
      ? allProduct
      : allProduct.filter(product => {
        console.log("Product category:", product);
        return product.category === category;
      });
    console.log("Filtered Products", filtered)
    setFilteredProducts(filtered);
  }, [allProduct]);

  
  const addToCart = (itemId, quantity) => {
    setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + quantity }));
  };

  const removeFromCart = (itemId) => {
    setCartItems(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProduct.find(product => product.id === item);
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
    filterProductsByCategory,
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
