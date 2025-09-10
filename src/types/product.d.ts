import {Category} from "./Category";
import {Review, Size} from "../data/mockDishes";


export type Product = {
  id: string;
  title: string;
  description: string; // Added description
  sizes: {
    id: string;
    title: Size;
    price: number;
  }[]; // Array of sizes with prices
  categories: Pick<Category, "id" | "name">[];
  imageUrls: string[]; // Array of image URLs
  rating: number; // e.g., 1-5
  reviews: Review[]; // Added reviews
  isAvailable: boolean;
  addOns: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}