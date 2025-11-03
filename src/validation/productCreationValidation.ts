import {z} from 'zod';
import {Size} from "../data/mockDishes"; // Assuming Size enum is exported from here

export const saveProductSchema = z.object({
  id: z.string().optional(),
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
  isAlwaysAvailable: z.boolean(),
  scheduledDates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')).optional(),
  images: z.array(z.any().refine((file) => file instanceof File, 'Must be a valid file')).optional(),
  addOns: z.array(z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Add-on title is required'),
    price: z.number().min(0, 'Add-on price cannot be negative'),
  })).optional(),
  newAddOnName: z.string().optional(),
  newAddOnPrice: z.string().optional(),
});

export type SaveProductFormData = z.infer<typeof saveProductSchema> & { keptImagesUrls?: { url: string }[] };
