export interface OrderItem {
  productId: string;
  quantity: number;
  name?: string; // Optional: to store product name directly if needed
}

export type OrderStatus = 'Incoming' | 'Ready to Prepare' | 'Preparing' | 'In Transit' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  orderCode: string;
  items: OrderItem[];
  total: number;
  time: string; // e.g., "10 minutes ago" or a timestamp string
  status: OrderStatus;
}
