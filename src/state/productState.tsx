import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Category} from "../../types/Category";
import {Product} from "../../types/Product";
import {Schedule} from "../../types/Schedule";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);

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
