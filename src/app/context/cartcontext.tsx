// context/cartcontext.tsx 
'use client'; 
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';  

interface Product {  
  id: string;  
  name: string;  
  description: string;  
  image: string;  
  price: string;  
}  

interface CartItem extends Product {  
  quantity: number;  
}  

interface CartContextType {  
  cartItems: CartItem[];  
  addToCart: (product: Product) => void;  
  removeFromCart: (id: string) => void;  
  updateQuantity: (id: string, quantity: number) => void;  
  clearCart: () => void; // To clear the cart  
  cartCount: number; // To get the total count of items in the cart  
}  

const CartContext = createContext<CartContextType | undefined>(undefined);  

export const CartProvider = ({ children }: { children: ReactNode }) => {  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);  

  // Load cart items from localStorage on component mount
  useEffect(() => {  
    const loadCartFromStorage = () => {
      try {
        const savedCart = localStorage.getItem('cartItems');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
      }
    };

    loadCartFromStorage();
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);  

  // Function to add a product to the cart  
  const addToCart = (product: Product) => {  
    setCartItems((prevItems) => {  
      const existingItem = prevItems.find((item) => item.id === product.id);  
      if (existingItem) {  
        return prevItems.map((item) =>  
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item  
        );  
      }  
      return [...prevItems, { ...product, quantity: 1 }];  
    });  
  };  

  // Function to remove a product from the cart  
  const removeFromCart = (id: string) => {  
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));  
  };  

  // Function to update quantity of a product in the cart  
  const updateQuantity = (id: string, quantity: number) => {  
    if (quantity < 1) {  
      removeFromCart(id); // Remove the item if quantity is less than 1  
      return;  
    }  
    setCartItems((prevItems) =>  
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))  
    );  
  };  

  // Function to clear all items in the cart  
  const clearCart = () => {  
    setCartItems([]);  
  };  

  // Total item count in the cart  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);  

  return (  
    <CartContext.Provider  
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}  
    >  
      {children}  
    </CartContext.Provider>  
  );  
};  

// Custom hook to use the CartContext  
export const useCart = () => {  
  const context = useContext(CartContext);  
  if (!context) {  
    throw new Error("useCart must be used within a CartProvider");  
  }  
  return context;  
};  