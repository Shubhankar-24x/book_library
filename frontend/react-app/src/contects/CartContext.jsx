import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (book) => {
    setCartItems((prevItems) => [...prevItems, book]);
    alert(`${book.title} has been added to your cart.`);
  };

  const handleRemoveFromCart = (bookToRemove) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== bookToRemove.id));
  };

  return (
    <CartContext.Provider value={{ cartItems, handleAddToCart, handleRemoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
};