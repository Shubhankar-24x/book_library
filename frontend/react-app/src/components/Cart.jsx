import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../contects/CartContext'; // Updated import path

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, handleRemoveFromCart } = useContext(CartContext); // Use cartItems and handleRemoveFromCart from context

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.rentalPrice, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white shadow rounded-lg">
              <div className="flex items-center space-x-4">
                <img src={item.imageURL || "default-image.jpg"} alt={item.title} className="w-20 h-30 object-cover" />
                <div>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Author: {item.author}</p>
                  <p className="text-gray-600">Price: ₹{item.rentalPrice}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="text-right mt-4">
            <h3 className="text-xl font-bold">Total: ₹{calculateTotal()}</h3>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
      <button
        onClick={() => navigate("/shop")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Cart;