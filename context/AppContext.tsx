import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Product, Schedule } from '../types'; // Assuming types are correctly defined elsewhere

interface AppContextType {
  categories: Category[];
  products: Product[];
  schedules: Schedule[];
  // Add functions to update state here later (e.g., setCategories, addProduct)
  setCategories: (categories: Category[]) => void;
  setProducts: (products: Product[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  // You would add functions here to modify the state, e.g.:
  // const addProduct = (product: Product) => {
  //   setProducts(prevProducts => [...prevProducts, product]);
  // };

  const contextValue: AppContextType = {
    categories,
    products,
    schedules,
    setCategories,
    setProducts,
    setSchedules,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
