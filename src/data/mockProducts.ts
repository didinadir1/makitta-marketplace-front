import {Product} from "../types/Product";

export const mockProducts: Product[] = [
  {
    id: 'prod1',
    name: 'Spring Rolls',
    image: '/food1.jpeg', // Use existing image
    description: 'Crispy spring rolls with a sweet chili dipping sauce.',
    category: 'cat1', // Appetizers
    basePrice: 5.99,
    addOns: [{id: "pr1", name: 'Sweet Chili Sauce', price: 0.50}],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
  {
    id: 'prod2',
    name: 'Grilled Salmon',
    image: '/food2.jpeg', // Use existing image
    description: 'Fresh grilled salmon with roasted vegetables.',
    category: 'cat2', // Main Courses
    basePrice: 18.50,
    addOns: [],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
  {
    id: 'prod3',
    name: 'Chocolate Cake',
    image: '/food3.jpeg', // Use existing image
    description: 'Rich and decadent chocolate cake.',
    category: 'cat3', // Desserts
    basePrice: 7.00,
    addOns: [{id: "pr1", name: 'Vanilla Ice Cream', price: 1.50}],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
  {
    id: 'prod4',
    name: 'Soda',
    image: '/food1.jpeg', // Use existing image
    description: 'Various soda options.',
    category: 'cat4', // Drinks
    basePrice: 2.50,
    addOns: [{id: "pr1", name: 'Lemon Slice', price: 0.50}],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
  {
    id: 'prod5',
    name: 'Steak Frites',
    image: '/food2.jpeg', // Use existing image
    description: 'Classic steak with French fries.',
    category: 'cat2', // Main Courses
    basePrice: 25.00,
    addOns: [{id: "pr1", name: 'Garlic Butter', price: 2.00}],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
  {
    id: 'prod6',
    name: 'Caesar Salad (Product)', // Renamed to avoid conflict with Dish
    image: '/food3.jpeg', // Use existing image
    description: 'Crisp romaine lettuce, croutons, parmesan cheese, and Caesar dressing.',
    category: 'cat1', // Appetizers (or could be Main if large)
    basePrice: 9.75,
    addOns: [],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
  {
    id: 'prod7',
    name: 'Margherita Pizza',
    image: '/food1.jpeg', // Use existing image
    description: 'Classic pizza with fresh mozzarella, tomatoes, and basil.',
    category: 'cat2', // Main Courses
    basePrice: 14.00,
    addOns: [],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
  {
    id: 'prod8',
    name: 'Fruit Salad',
    image: '/food2.jpeg', // Use existing image
    description: 'A mix of seasonal fruits.',
    category: 'cat3', // Desserts
    basePrice: 6.50,
    addOns: [],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
  {
    id: 'prod9',
    name: 'Iced Tea',
    image: '/food3.jpeg', // Use existing image
    description: 'Refreshing iced tea with lemon.',
    category: 'cat4', // Drinks
    basePrice: 3.00,
    addOns: [{id: "pr1", name: 'Lemon Slice', price: 0.50}],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
  {
    id: 'prod10',
    name: 'Pasta Primavera',
    image: '/food1.jpeg', // Use existing image
    description: 'Pasta with seasonal vegetables and olive oil.',
    category: 'cat2', // Main Courses
    basePrice: 12.50,
    addOns: [{id: "pr1", name: 'Parmesan Cheese', price: 1.00}],
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ]
  },
];
