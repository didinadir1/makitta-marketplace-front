import {z} from 'zod';

export const imageSchema = z.any().refine((file) => file instanceof File, 'Must be a valid file');

// Schema for the first step: Store Information
export const storeDetailsSchema = z.object({
  // todo change min
  name: z.string().min(3, 'Name is required'),
  address: z.string().min(5, 'Address is required'),
  description: z.string().optional(),
  // Add image field: it can be a File object or null/undefined
  // We'll validate its presence if needed in the main form submission
  image: imageSchema.optional(),
});

export type StoreDetailsFormData = z.infer<typeof storeDetailsSchema>;

