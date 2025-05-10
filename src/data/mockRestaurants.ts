export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[]; // e.g., ['Italian', 'Pizza']
  rating: number; // e.g., 1-5
  distance: string; // e.g., "0.5 miles"
  deliveryTime: string; // e.g., "20-30 min"
  imageUrl: string; // Single image URL for the restaurant card
}

export const mockRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Pizza Palace',
    cuisine: ['Pizza', 'Italian'],
    rating: 4.5,
    distance: '1.2 miles',
    deliveryTime: '25-35 min',
    imageUrl: '/food1.jpeg',
  },
  {
    id: 'r2',
    name: 'Sushi Spot',
    cuisine: ['Sushi', 'Japanese'],
    rating: 4.8,
    distance: '0.8 miles',
    deliveryTime: '20-30 min',
    imageUrl: '/food2.jpeg',
  },
  {
    id: 'r3',
    name: 'Burger Joint',
    cuisine: ['Burgers', 'American'],
    rating: 4.0,
    distance: '0.5 miles',
    deliveryTime: '15-25 min',
    imageUrl: '/food3.jpeg',
  },
  {
    id: 'r4',
    name: 'Healthy Bites',
    cuisine: ['Salads', 'Healthy'],
    rating: 4.3,
    distance: '1.0 miles',
    deliveryTime: '10-15 min',
    imageUrl: '/food1.jpeg',
  },
  {
    id: 'r5',
    name: 'Taco Town',
    cuisine: ['Mexican', 'Tacos'],
    rating: 4.1,
    distance: '1.5 miles',
    deliveryTime: '30-40 min',
    imageUrl: '/food3.jpeg',
  },
];
