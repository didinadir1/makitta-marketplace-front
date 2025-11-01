import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Dish} from '../data/mockDishes';
import {Product} from "../types/product"; // Assuming Dish interface is in mockDishes.ts

interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  total: number;
  addItem: (dish: Product) => void;
  removeItem: (dishId: string) => void;
  updateItemQuantity: (dishId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addItem = (dish: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.dish.id === dish.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.dish.id === dish.id ? {...item, quantity: item.quantity + 1} : item
        );
      } else {
        return [...prevItems, {dish, quantity: 1}];
      }
    });
  };

  const removeItem = (dishId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.dish.id !== dishId));
  };

  const updateItemQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(dishId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.dish.id === dishId ? {...item, quantity: quantity} : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.dish.basePrice.replace('$', '')) * item.quantity, 0);

  return (
    <CartContext.Provider value={{cartItems, total, addItem, removeItem, updateItemQuantity, clearCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
