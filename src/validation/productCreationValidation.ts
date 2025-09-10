import {z} from 'zod';
import {Size} from "../data/mockDishes"; // Assuming Size enum is exported from here

export const productCreationSchema = z.object({
  title: z.string().min(1, 'Product title is required'),
  description: z.string().optional(),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string()
  })).min(1, 'At least one category is required'),
  sizes: z.array(z.object({
    id: z.string().optional(), // ID is optional for new sizes
    title: z.nativeEnum(Size, {
      errorMap: () => ({message: 'Invalid size selected'})
    }),
    price: z.number().min(1, 'enter a valid price'),
  })).min(1, 'At least one size and price is required'),
  isAvailable: z.boolean(),
  images: z.union([z.array(z.instanceof(File)), z.instanceof(File)]).optional(),
  addOns: z.array(z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Add-on title is required'),
    price: z.number().min(0, 'Add-on price cannot be negative'),
  })).optional(),
  newAddOnName: z.string().optional(),
  newAddOnPrice: z.string().optional(),
});

export type ProductCreationFormData = z.infer<typeof productCreationSchema>;
