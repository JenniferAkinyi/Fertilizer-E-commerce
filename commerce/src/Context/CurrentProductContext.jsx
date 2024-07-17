// src/Context/CurrentProductContext.js
import React, { createContext, useState, useContext } from 'react';

const CurrentProductContext = createContext();

export const CurrentProductProvider = ({ children }) => {
  const [currentProduct, setCurrentProduct] = useState(null);

  return (
    <CurrentProductContext.Provider value={{ currentProduct, setCurrentProduct }}>
      {children}
    </CurrentProductContext.Provider>
  );
};

export const useCurrentProduct = () => useContext(CurrentProductContext);
