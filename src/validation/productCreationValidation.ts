import {z} from 'zod';

// Schema for the first step (Personal Information)
export const productCreationSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  description: z.string().optional(),
  categories: z.array(z.object({
    id: z.string(),
    name: z.string().min(3, 'category name is required'),
  })).nonempty(),
  isAvailable: z.boolean(),
  images: z.array(z.any().refine((file) => file instanceof File, 'Must be a valid file')).optional(),
  addOns: z.array(z.object({
    id: z.string(),
    name: z.string().min(3, 'Add-on name is required'),
    price: z.number().nonnegative('Price must be valid'),
  })).optional(),
  newAddOnName: z.string().optional(),
  newAddOnPrice: z.string().optional(),
})

export type ProductCreationFormData = z.infer<typeof productCreationSchema>;