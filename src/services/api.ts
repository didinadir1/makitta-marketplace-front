import { mockProducts } from '../data/mockProducts';
import { mockCategories } from '../data/mockCategories';
import { mockSchedules } from '../data/mockSchedules';
import {Product} from "../types/Product";
import {Category} from "../types/Category";
import {Schedule} from "../types/Schedule";

// Simulate an API call with a delay
const simulateApiCall = <T>(data: T): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500); // Simulate network delay
  });
};

export const fetchProducts = (): Promise<Product[]> => {
  return simulateApiCall(mockProducts);
};

export const fetchCategories = (): Promise<Category[]> => {
  return simulateApiCall(mockCategories);
};

export const fetchSchedules = (): Promise<Schedule[]> => {
  return simulateApiCall(mockSchedules);
};

// Add other fetch functions as needed, e.g.:
// export const fetchProductById = (id: string): Promise<Product | undefined> => {
//   const product = mockProducts.find(p => p.id === id);
//   return simulateApiCall(product);
// };

// export const fetchCategoryById = (id: string): Promise<Category | undefined> => {
//   const category = mockCategories.find(c => c.id === id);
//   return simulateApiCall(category);
// };
