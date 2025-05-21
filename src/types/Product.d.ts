export interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  imageUrls: string[]; // Array of image URLs
  basePrice: number;
  isAvailable: boolean;
  addOns: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}
