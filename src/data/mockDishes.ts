export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

export interface Dish {
  id: string;
  name: string;
  price: string;
  tags: string[];
  rating: number; // e.g., 1-5
  distance: string; // e.g., "0.5 miles"
  timeToReady: string; // e.g., "20-30 min"
  imageUrls: string[]; // Array of image URLs
  description: string; // Added description
  reviews: Review[]; // Added reviews
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
      '/food1.jpeg',
      '/food2.jpeg',
    ],
    description: 'A classic Italian pasta dish from Rome made with egg, hard cheese, cured pork, and black pepper.',
    reviews: [
      { id: 'r1', author: 'Alice', rating: 5, comment: 'Absolutely delicious! Creamy and flavorful.' },
      { id: 'r2', author: 'Bob', rating: 4, comment: 'Very good, but a little rich.' },
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
      '/food1.jpeg',
      '/food2.jpeg',
      '/food3.jpeg',
    ],
    description: 'A traditional Neapolitan pizza topped with San Marzano tomatoes, fresh mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.',
    reviews: [
      { id: 'r3', author: 'Charlie', rating: 5, comment: 'Perfectly simple and fresh.' },
      { id: 'r4', author: 'David', rating: 4, comment: 'Great crust and sauce.' },
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
      '/food1.jpeg',
    ],
    description: 'A selection of fresh and expertly prepared sushi and sashimi.',
    reviews: [
      { id: 'r5', author: 'Eve', rating: 5, comment: 'Incredible quality and presentation.' },
      { id: 'r6', author: 'Frank', rating: 5, comment: 'The freshest sushi I\'ve had!' },
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
      '/food1.jpeg',
      '/food2.jpeg',
    ],
    description: 'A juicy grilled chicken patty served in a bun with lettuce, tomato, and special sauce.',
    reviews: [
      { id: 'r7', author: 'Grace', rating: 4, comment: 'Solid burger, good value.' },
      { id: 'r8', author: 'Heidi', rating: 3, comment: 'A bit dry, but the sauce was good.' },
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
      '/food1.jpeg',
    ],
    description: 'Crisp romaine lettuce, croutons, parmesan cheese, and Caesar dressing.',
    reviews: [
      { id: 'r9', author: 'Ivan', rating: 4, comment: 'Fresh and tasty.' },
      { id: 'r10', author: 'Judy', rating: 5, comment: 'My go-to salad!' },
    ],
  },
];
