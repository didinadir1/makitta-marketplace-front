import {CartDTO, CartLineItemDTO, OrderDTO, OrderLineItemDTO} from "@medusajs/types";
import {RestaurantDTO} from "./user";

export const DeliveryStatus = {
  PENDING: "pending",
  RESTAURANT_DECLINED: "restaurant_declined",
  RESTAURANT_ACCEPTED: "restaurant_accepted",
  PICKUP_CLAIMED: "pickup_claimed",
  RESTAURANT_PREPARING: "restaurant_preparing",
  READY_FOR_PICKUP: "ready_for_pickup",
  IN_TRANSIT: "in_transit",
  DELIVERED: "delivered",
} as const;

export interface DeliveryDTO {
  id: string;
  transaction_id: string;
  driver_id?: string;
  cart: CartDTO;
  order?: OrderDTO;
  restaurant: RestaurantDTO;
  delivered_at?: Date;
  delivery_status: DeliveryStatus;
  created_at: Date;
  updated_at: Date;
  eta?: Date;
  items: DeliveryItemDTO[];
}

export type DeliveryItemDTO = (CartLineItemDTO | OrderLineItemDTO) & {
  quantity: number;
};

export interface CreateDeliveryDTO {
  restaurant_id: string;
  cart_id: string;
}

export interface UpdateDeliveryDTO extends Partial<DeliveryDTO> {
  id: string;
}