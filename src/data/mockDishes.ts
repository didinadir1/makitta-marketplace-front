export interface Dish {
  id: string;
  name: string;
  price: string;
  tags: string[];
  rating: number; // e.g., 1-5
  distance: string; // e.g., "0.5 miles"
  timeToReady: string; // e.g., "20-30 min"
  imageUrls: string[]; // Array of image URLs
}

export const mockDishes: Dish[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    price: '$14.99',
    tags: ['Pasta', 'Italian', 'Classic'],
    rating: 4.5,
    distance: '1.2 miles',
    timeToReady: '25-35 min',
    imageUrls: [
      'https://via.placeholder.com/300x200/FFC107/000000?Text=Carbonara+1',
      'https://via.placeholder.com/300x200/FF9800/000000?Text=Carbonara+2',
    ],
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    price: '$12.50',
    tags: ['Pizza', 'Italian', 'Vegetarian'],
    rating: 4.2,
    distance: '0.8 miles',
    timeToReady: '20-30 min',
    imageUrls: [
      'https://via.placeholder.com/300x200/4CAF50/FFFFFF?Text=Pizza+1',
      'https://via.placeholder.com/300x200/8BC34A/FFFFFF?Text=Pizza+2',
      'https://via.placeholder.com/300x200/CDDC39/000000?Text=Pizza+3',
    ],
  },
  {
    id: '3',
    name: 'Sushi Platter',
    price: '$22.00',
    tags: ['Sushi', 'Japanese', 'Seafood'],
    rating: 4.8,
    distance: '2.5 miles',
    timeToReady: '30-40 min',
    imageUrls: [
      'https://via.placeholder.com/300x200/E91E63/FFFFFF?Text=Sushi+1',
    ],
  },
  {
    id: '4',
    name: 'Chicken Burger',
    price: '$10.99',
    tags: ['Burger', 'American', 'Fast Food'],
    rating: 4.0,
    distance: '0.5 miles',
    timeToReady: '15-25 min',
    imageUrls: [
      'https://via.placeholder.com/300x200/9C27B0/FFFFFF?Text=Burger+1',
      'https://via.placeholder.com/300x200/673AB7/FFFFFF?Text=Burger+2',
    ],
  },
  {
    id: '5',
    name: 'Caesar Salad',
    price: '$9.75',
    tags: ['Salad', 'Healthy', 'Vegetarian'],
    rating: 4.3,
    distance: '1.0 miles',
    timeToReady: '10-15 min',
    imageUrls: [
      'https://via.placeholder.com/300x200/00BCD4/FFFFFF?Text=Salad+1',
    ],
  },
];
