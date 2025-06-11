import {ProductDTO} from "@medusajs/types";

export interface RestaurantDTO {
  id: string;
  handle: string;
  is_open: boolean;
  name: string;
  description?: string;
  address: string;
  phone: string;
  email: string;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
  products?: ProductDTO[];
  deliveries: DeliveryDTO[];
}

export interface CreateRestaurantDTO {
  name: string;
  first_name: string;
  last_name: string;
  handle?: string;
  address: string;
  phone: string;
  email: string;
  description?: string;
  image_url?: string;
  is_open?: boolean;
}


export type UpdateRestaurantDTO = Partial<CreateRestaurantDTO>;

export interface RestaurantProductDTO {
  restaurant_id: string;
  product_id: string;
}

