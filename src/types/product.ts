import {ProductDTO} from "@medusajs/types";
import {Size} from "../data/mockDishes";


interface ProductMetadata {
  basePrice?: number;
  sizes?: { id: string; title: Size; price: number }[];
  addOns?: { id: string; title: string; price: number }[];
  isAlwaysAvailable?: boolean;
  scheduledDates?: string[];

  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type,@typescript-eslint/no-unsafe-declaration-merging
export interface Product extends ProductDTO {
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class Product {
  metadata?: ProductMetadata;

  constructor(data: ProductDTO) {
    Object.assign(this, data);
  }

  get is_currently_available(): boolean {
    return !!(this.metadata?.isAlwaysAvailable ??
      (this.metadata?.scheduledDates &&
        this.metadata.scheduledDates.length > 0 &&
        this.metadata.scheduledDates.some((date) => new Date(date) >= new Date())));
  }
}