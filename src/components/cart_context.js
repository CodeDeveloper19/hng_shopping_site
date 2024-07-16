'use client'
import React, { createContext, useState } from 'react';

const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [numberOfCartItems, setNumberOfCartItems] = useState(null);
    const [showCartNotification, setShowCartNotification] = useState('none');

  return (
    <CartContext.Provider value={[[numberOfCartItems, setNumberOfCartItems], [showCartNotification, setShowCartNotification] ]}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
