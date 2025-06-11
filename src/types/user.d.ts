import {CustomerDTO} from "@medusajs/types";


export type UserRole = "customer" | "restaurant" | "driver"

export type User = CustomerDTO | RestaurantAdminDTO | DriverDTO

export interface RestaurantAdminDTO {
  id: string;
  restaurant_id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}


export interface CreateAdminInviteDTO {
  resadm_id: string;
  role?: string | null;
  email?: string;
}


export interface DriverDTO {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface DeliveryDriverDTO {
  id: string;
  delivery_id: string;
  driver_id: string;
}

export interface CreateUserDTO {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  actor_type: UserRole;
  avatar_url?: string;
}

export interface UpdateDriverDTO extends Partial<DriverDTO> {
  id: string;
}

export interface CreateDeliveryDriverDTO {
  delivery_id: string;
  driver_id: string;
}
