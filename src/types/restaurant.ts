import {Product} from "./product";
import {DeliveryDTO} from "./delivery";


export class RestaurantDTO {
  id: string;
  handle: string;
  is_open: boolean;
  name: string;
  description?: string;
  address: string;
  phone: string;
  email: string;
  image_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  snapchat_url?: string;
  created_at?: Date;
  updated_at?: Date;
  products?: Product[];
  deliveries?: DeliveryDTO[];

  constructor(public dto: RestaurantDTO) {
    Object.assign(this, dto);
    this.products = dto.products?.map(p => new Product(p)) ?? []
  }


  get has_available_products(): boolean {
    if (!this.products || this.products.length === 0) return false;

    return this.products.some(product => product.is_currently_available);
  }

}

export interface CreateRestaurantDTO {
  name: string;
  handle?: string;
  address: string;
  description?: string;
  image_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  snapchat_url?: string;
}


export type UpdateRestaurantDTO = Partial<CreateRestaurantDTO> & { id: string };

export interface RestaurantProductDTO {
  restaurant_id: string;
  product_id: string;
}

