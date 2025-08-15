import {Category} from "../types/Category";

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

export enum Size {
  SMALL = "Small",
  MEDIUM = "Standard",
  LARGE = "Large",
}

export interface Dish {
  id: string;
  name: string;
  sizes: [{
    id: string;
    name: Size;
    price: number;
  }]
  basePrice: string;
  categories: Pick<Category, "id" | "name">[];
  rating: number; // e.g., 1-5
  distance: string; // e.g., "0.5 miles"
  timeToReady: string; // e.g., "20-30 min"
  imageUrls: string[]; // Array of image URLs
  description: string; // Added description
  reviews: Review[]; // Added reviews
  isAvailable: boolean;
  addOns: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

export const mockDishes: Dish[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    basePrice: '$14.99',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],
    rating: 4.5,
    distance: '1.2 miles',
    timeToReady: '25-35 min',
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ],
    description: 'A classic Italian pasta dish from Rome made with egg, hard cheese, and black pepper.',
    reviews: [
      {id: 'r1', author: 'Alice', rating: 5, comment: 'Absolutely delicious! Creamy and flavorful.'},
      {id: 'r2', author: 'Bob', rating: 4, comment: 'Very good, but a little rich.'},
    ],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Margherita Pizza',
    basePrice: '$12.50',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

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
      {id: 'r3', author: 'Charlie', rating: 5, comment: 'Perfectly simple and fresh.'},
      {id: 'r4', author: 'David', rating: 4, comment: 'Great crust and sauce.'},
    ],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Sushi Platter',
    basePrice: '$22.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.8,
    distance: '2.5 miles',
    timeToReady: '30-40 min',
    imageUrls: [
      '/food1.jpeg',
    ],
    description: 'A selection of fresh and expertly prepared sushi and sashimi.',
    reviews: [
      {id: 'r5', author: 'Eve', rating: 5, comment: 'Incredible quality and presentation.'},
      {id: 'r6', author: 'Frank', rating: 5, comment: 'The freshest sushi I\'ve had!'},
    ],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '4',
    name: 'Chicken Burger',
    basePrice: '$10.99',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.0,
    distance: '0.5 miles',
    timeToReady: '15-25 min',
    imageUrls: [
      '/food1.jpeg',
      '/food2.jpeg',
    ],
    description: 'A juicy grilled chicken patty served in a bun with lettuce, tomato, and special sauce.',
    reviews: [
      {id: 'r7', author: 'Grace', rating: 4, comment: 'Solid burger, good value.'},
      {id: 'r8', author: 'Heidi', rating: 3, comment: 'A bit dry, but the sauce was good.'},
    ],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '5',
    name: 'Caesar Salad',
    basePrice: '$9.75',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.3,
    distance: '1.0 miles',
    timeToReady: '10-15 min',
    imageUrls: [
      '/food1.jpeg',
    ],
    description: 'Crisp romaine lettuce, croutons, parmesan cheese, and Caesar dressing.',
    reviews: [
      {id: 'r9', author: 'Ivan', rating: 4, comment: 'Fresh and tasty.'},
      {id: 'r10', author: 'Judy', rating: 5, comment: 'My go-to salad!'},
    ],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  // Added more mock dishes
  {
    id: '6',
    name: 'Lasagna Bolognese',
    basePrice: '$16.50',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.6,
    distance: '1.3 miles',
    timeToReady: '35-45 min',
    imageUrls: ['/food2.jpeg'],
    description: 'Layers of pasta, rich meat sauce, béchamel, and cheese, baked to perfection.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '7',
    name: 'Pepperoni Pizza',
    basePrice: '$13.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.1,
    distance: '0.9 miles',
    timeToReady: '20-30 min',
    imageUrls: ['/food3.jpeg'],
    description: 'Classic pizza topped with generous amounts of pepperoni and mozzarella cheese.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '8',
    name: 'Garlic Bread',
    basePrice: '$5.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.4,
    distance: '1.1 miles',
    timeToReady: '10-15 min',
    imageUrls: ['/food1.jpeg'],
    description: 'Toasted bread with garlic butter and herbs.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '9',
    name: 'California Roll',
    basePrice: '$8.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.3,
    distance: '0.7 miles',
    timeToReady: '15-20 min',
    imageUrls: ['/food2.jpeg'],
    description: 'A popular sushi roll with cucumber, crab meat, and avocado.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '10',
    name: 'Spicy Tuna Roll',
    basePrice: '$9.50',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.6,
    distance: '0.9 miles',
    timeToReady: '15-20 min',
    imageUrls: ['/food3.jpeg'],
    description: 'Tuna mixed with spicy mayonnaise and rolled with rice and seaweed.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '11',
    name: 'Edamame',
    basePrice: '$4.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.0,
    distance: '0.6 miles',
    timeToReady: '5-10 min',
    imageUrls: ['/food1.jpeg'],
    description: 'Steamed soybeans in the pod, lightly salted.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '12',
    name: 'Beef Burger',
    basePrice: '$11.50',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.2,
    distance: '0.4 miles',
    timeToReady: '15-25 min',
    imageUrls: ['/food2.jpeg'],
    description: 'Classic beef patty with lettuce, tomato, onion, and pickles.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '13',
    name: 'Cheese Burger',
    basePrice: '$12.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.3,
    distance: '0.4 miles',
    timeToReady: '15-25 min',
    imageUrls: ['/food3.jpeg'],
    description: 'Beef patty topped with melted cheese.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '14',
    name: 'Bacon Burger',
    basePrice: '$13.50',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.5,
    distance: '0.5 miles',
    timeToReady: '20-30 min',
    imageUrls: ['/food1.jpeg'],
    description: 'Beef patty with crispy bacon and cheese.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '15',
    name: 'French Fries',
    basePrice: '$4.50',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.1,
    distance: '0.3 miles',
    timeToReady: '10-15 min',
    imageUrls: ['/food2.jpeg'],
    description: 'Crispy golden French fries.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '16',
    name: 'Onion Rings',
    basePrice: '$5.50',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.0,
    distance: '0.4 miles',
    timeToReady: '10-15 min',
    imageUrls: ['/food3.jpeg'],
    description: 'Battered and fried onion rings.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '17',
    name: 'Greek Salad',
    basePrice: '$10.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.2,
    distance: '1.1 miles',
    timeToReady: '10-15 min',
    imageUrls: ['/food1.jpeg'],
    description: 'Fresh salad with tomatoes, cucumbers, red onion, feta cheese, and olives.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '18',
    name: 'Quinoa Bowl',
    basePrice: '$11.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.5,
    distance: '1.2 miles',
    timeToReady: '15-20 min',
    imageUrls: ['/food2.jpeg'],
    description: 'Nutritious bowl with quinoa, roasted vegetables, and a light dressing.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '19',
    name: 'Chicken Tacos',
    basePrice: '$3.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.3,
    distance: '1.4 miles',
    timeToReady: '15-20 min',
    imageUrls: ['/food3.jpeg'],
    description: 'Soft corn tortillas filled with seasoned grilled chicken.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '20',
    name: 'Beef Burrito',
    basePrice: '$9.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.0,
    distance: '1.5 miles',
    timeToReady: '20-25 min',
    imageUrls: ['/food1.jpeg'],
    description: 'Large flour tortilla filled with seasoned beef, rice, beans, and cheese.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '21',
    name: 'Cheese Quesadilla',
    basePrice: '$7.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.1,
    distance: '1.3 miles',
    timeToReady: '10-15 min',
    imageUrls: ['/food2.jpeg'],
    description: 'Grilled flour tortilla filled with melted cheese.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
  {
    id: '22',
    name: 'Guacamole and Chips',
    basePrice: '$6.00',
    categories: [{id: "cat1", name: 'Pasta'}, {id: "cat2", name: 'Italian'}],

    rating: 4.5,
    distance: '1.4 miles',
    timeToReady: '5-10 min',
    imageUrls: ['/food3.jpeg'],
    description: 'Freshly made guacamole served with crispy tortilla chips.',
    reviews: [],
    addOns: [
      {id: 'addon1', name: 'Extra Cheese', price: 2.00},
      {id: 'addon2', name: 'Grilled Chicken', price: 3.50},
    ],
    isAvailable: true,
  },
];
