import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Category, Product, Schedule } from '../types'; // Assuming types are correctly defined elsewhere
import { mockCategories } from '../data/mockCategories'; // Import mock data
import { mockProducts } from '../data/mockProducts'; // Import mock data
import { mockSchedules } from '../data/mockSchedules'; // Import mock data

interface ProductContextType {
  categories: Category[];
  products: Product[];
  schedules: Schedule[];
  // Add functions to update state here later (e.g., setCategories, addProduct)
  setCategories: (categories: Category[]) => void;
  setProducts: (products: Product[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with mock data
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [products, setProducts] = useState<Product[]>(mockProducts);
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
