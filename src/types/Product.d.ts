export interface Product {
  imageUrls: string[]; // Array of image URLs
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  basePrice: number;
  addOns: string[];
}
