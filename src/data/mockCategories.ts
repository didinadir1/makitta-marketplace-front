import {Category} from "../types/Category";

export const mockCategories: Category[] = [
  { id: 'cat1', name: 'Appetizers', description: 'Delicious starters to whet your appetite.', isVisible: true },
  { id: 'cat2', name: 'Main Courses', description: 'Hearty and satisfying main dishes.', isVisible: true },
  { id: 'cat3', name: 'Desserts', description: 'Sweet treats to finish your meal.', isVisible: true },
  { id: 'cat4', name: 'Drinks', description: 'Refreshing beverages.', isVisible: true },
  { id: 'cat5', name: 'Specials', description: 'Limited time offers.', isVisible: false }, // Example of a hidden category
];
