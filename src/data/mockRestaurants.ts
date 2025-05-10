export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[]; // e.g., ['Italian', 'Pizza']
  rating: number; // e.g., 1-5
  distance: string; // e.g., "0.5 miles"
  status: 'Open' | 'Closed'; // Replaced deliveryTime with status
  imageUrls: string[]; // Changed to array for multiple images
  description: string; // Added description
}

export const mockRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: 'Pizza Palace',
    cuisine: ['Pizza', 'Italian'],
    rating: 4.5,
    distance: '1.2 miles',
    status: 'Open',
    imageUrls: [ // Multiple images
      '/food1.jpeg',
      '/food2.jpeg',
      '/food3.jpeg',
    ],
    description: 'Serving authentic Neapolitan pizzas and classic Italian pasta dishes in a cozy atmosphere.', // Added description
  },
  {
    id: 'r2',
    name: 'Sushi Spot',
    cuisine: ['Sushi', 'Japanese'],
    rating: 4.8,
    distance: '0.8 miles',
    status: 'Open',
    imageUrls: [
      '/food2.jpeg',
      '/food1.jpeg',
    ],
    description: 'Freshly prepared sushi and sashimi with a wide selection of rolls and Japanese appetizers.',
  },
  {
    id: 'r3',
    name: 'Burger Joint',
    cuisine: ['Burgers', 'American'],
    rating: 4.0,
    distance: '0.5 miles',
    status: 'Closed',
    imageUrls: [
      '/food3.jpeg',
      '/food1.jpeg',
    ],
    description: 'Classic American burgers, fries, and shakes made with high-quality ingredients.',
  },
  {
    id: 'r4',
    name: 'Healthy Bites',
    cuisine: ['Salads', 'Healthy'],
    rating: 4.3,
    distance: '1.0 miles',
    status: 'Open',
    imageUrls: [
      '/food1.jpeg',
      '/food3.jpeg',
    ],
    description: 'Fresh and healthy salads, bowls, and smoothies for a nutritious meal.',
  },
  {
    id: 'r5',
    name: 'Taco Town',
    cuisine: ['Mexican', 'Tacos'],
    rating: 4.1,
    distance: '1.5 miles',
    status: 'Open',
    imageUrls: [
      '/food3.jpeg',
      '/food2.jpeg',
    ],
    description: 'Authentic Mexican street tacos, burritos, and quesadillas with homemade salsas.',
  },
];
