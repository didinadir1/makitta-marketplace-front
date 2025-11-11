import { Order } from "../vendor/types/order";

export const mockOrders: Order[] = [
  {
    id: 'ord1',
    orderCode: 'ORD001',
    items: [
      { productId: '1', quantity: 2 },
      { productId: '4', quantity: 1 },
    ],
    total: 14.48, // 2 * 5.99 + 1 * 2.50 = 11.98 + 2.50 = 14.48
    time: '5 minutes ago',
    status: 'Incoming',
  },
  {
    id: 'ord2',
    orderCode: 'ORD002',
    items: [
      { productId: '2', quantity: 1 },
      { productId: '3', quantity: 1 },
    ],
    total: 25.50, // 1 * 18.50 + 1 * 7.00 = 25.50
    time: '15 minutes ago',
    status: 'Ready to Prepare',
  },
  {
    id: 'ord3',
    orderCode: 'ORD003',
    items: [
      { productId: '5', quantity: 1 },
      { productId: '6', quantity: 3 },
    ],
    total: 54.25, // 1 * 25.00 + 3 * 9.75 = 25.00 + 29.25 = 54.25
    time: '30 minutes ago',
    status: 'Preparing',
  },
  {
    id: 'ord4',
    orderCode: 'ORD004',
    items: [
      { productId: '1', quantity: 1 },
      { productId: '3', quantity: 2 },
      { productId: '4', quantity: 1 },
    ],
    total: 22.49, // 1 * 5.99 + 2 * 7.00 + 1 * 2.50 = 5.99 + 14.00 + 2.50 = 22.49
    time: '1 hour ago',
    status: 'In Transit',
  },
  {
    id: 'ord5',
    orderCode: 'ORD005',
    items: [
      { productId: '2', quantity: 2 },
    ],
    total: 37.00, // 2 * 18.50 = 37.00
    time: '2 hours ago',
    status: 'Completed',
  },
   {
    id: 'ord6',
    orderCode: 'ORD006',
    items: [
      { productId: '6', quantity: 1 },
    ],
    total: 9.75,
    time: 'Yesterday',
    status: 'Cancelled',
  },
];
