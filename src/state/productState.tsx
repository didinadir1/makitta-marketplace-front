import React, {createContext, ReactNode, useContext, useState} from 'react';
import {mockCategories} from '../data/mockCategories'; // Import mock data
import {mockSchedules} from '../data/mockSchedules';
import {Category} from "../types/Category";
import {Schedule} from "../types/Schedule";
import {Dish, mockDishes} from "../data/mockDishes"; // Import mock data

interface ProductContextType {
  categories: Category[];
  products: Dish[];
  schedules: Schedule[];
  // Add functions to update state here later (e.g., setCategories, addProduct)
  setCategories: (categories: Category[]) => void;
  setProducts: (products: Dish[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  // Initialize state with mock data
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [products, setProducts] = useState<Dish[]>(mockDishes);
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);

  // You would add functions here to modify the state, e.g.:
  // const addProduct = (product: Product) => {
  //   setProducts(prevProducts => [...prevProducts, product]);
  // };

  const contextValue: ProductContextType = {
    categories,
    products,
    schedules,
    setCategories,
    setProducts,
    setSchedules,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within an ProductContextProvider');
  }
  return context;
};
