export interface Metric {
  totalRevenue: number;
  ordersToday: number;
  averageOrderValue: number;
  // Add other metrics as needed
}

export interface TopSellingItem {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
}

export interface RecentOrder {
  id: string;
  status: 'Completed' | 'Pending' | 'Cancelled';
  items: { dishId: string; quantity: number }[];
  total: number;
  time: string; // e.g., "10 minutes ago"
}

export interface DashboardData {
  metrics: Metric;
  topSellingItems: TopSellingItem[];
  recentOrders: RecentOrder[];
}

export const mockDashboardData: DashboardData = {
  metrics: {
    totalRevenue: 15235.75,
    ordersToday: 45,
    averageOrderValue: 33.86,
  },
  topSellingItems: [
    { id: '1', name: 'Spaghetti Carbonara', category: 'Pasta', unitsSold: 120 },
    { id: '2', name: 'Margherita Pizza', category: 'Pizza', unitsSold: 95 },
    { id: '4', name: 'Chicken Burger', category: 'Burgers', unitsSold: 88 },
    { id: '3', name: 'Sushi Platter', category: 'Sushi', unitsSold: 75 },
    { id: '15', name: 'French Fries', category: 'Side', unitsSold: 150 },
  ],
  recentOrders: [
    { id: '1001', status: 'Completed', items: [{ dishId: '1', quantity: 1 }, { dishId: '15', quantity: 1 }], total: 19.49, time: '5 minutes ago' },
    { id: '1002', status: 'Completed', items: [{ dishId: '2', quantity: 2 }], total: 25.00, time: '15 minutes ago' },
    { id: '1003', status: 'Completed', items: [{ dishId: '4', quantity: 1 }, { dishId: '16', quantity: 1 }], total: 16.49, time: '30 minutes ago' },
    { id: '1004', status: 'Completed', items: [{ dishId: '3', quantity: 1 }], total: 22.00, time: '1 hour ago' },
  ],
};
