import {ProductDTO} from "@medusajs/types";
import {Size} from "../data/mockDishes";


interface ProductMetadata {
  basePrice?: number;
  sizes?: { id: string; title: Size; price: number }[];
  addOns?: { id: string; title: string; price: number }[];
}


export type Product = ProductDTO