import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Spring Rolls',
    image: '/food1.jpeg', // Use existing image
    description: 'Crispy spring rolls with a sweet chili dipping sauce.',
    category: 'cat1', // Appetizers
    basePrice: 5.99,
    addOns: ['Extra Sauce'],
  },
  {
    id: 'prod2',
    name: 'Grilled Salmon',
    image: '/food2.jpeg', // Use existing image
    description: 'Fresh grilled salmon with roasted vegetables.',
    category: 'cat2', // Main Courses
    basePrice: 18.50,
    addOns: ['Lemon Wedge', 'Tartar Sauce'],
  },
  {
    id: 'prod3',
    name: 'Chocolate Cake',
    image: '/food3.jpeg', // Use existing image
    description: 'Rich and decadent chocolate cake.',
    category: 'cat3', // Desserts
    basePrice: 7.00,
    addOns: ['Whipped Cream', 'Ice Cream'],
  },
  {
    id: 'prod4',
    name: 'Soda',
    image: '/food1.jpeg', // Use existing image
    description: 'Various soda options.',
    category: 'cat4', // Drinks
    basePrice: 2.50,
    addOns: ['Ice'],
  },
  {
    id: 'prod5',
    name: 'Steak Frites',
    image: '/food2.jpeg', // Use existing image
    description: 'Classic steak with French fries.',
    category: 'cat2', // Main Courses
    basePrice: 25.00,
    addOns: ['Mushroom Sauce', 'Peppercorn Sauce'],
  },
  {
    id: 'prod6',
    name: 'Caesar Salad (Product)', // Renamed to avoid conflict with Dish
    image: '/food3.jpeg', // Use existing image
    description: 'Crisp romaine lettuce, croutons, parmesan cheese, and Caesar dressing.',
    category: 'cat1', // Appetizers (or could be Main if large)
    basePrice: 9.75,
    addOns: ['Grilled Chicken', 'Shrimp'],
  },
];
