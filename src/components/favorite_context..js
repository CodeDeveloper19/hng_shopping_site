'use client'
import React, { createContext, useState } from 'react';

const FavoriteContext = createContext();

const FavoriteContextProvider = ({ children }) => {
    const [numberOfFavoriteItems, setNumberOfFavoriteItems] = useState(null);
    const [showFavoriteNotification, setShowFavoriteNotification] = useState('none');

  return (
    <FavoriteContext.Provider value={[[numberOfFavoriteItems, setNumberOfFavoriteItems], [showFavoriteNotification, setShowFavoriteNotification] ]}>
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteContextProvider };
