import {z} from 'zod';

// Schema for the first step: Store Information
export const storeDetailsSchema = z.object({
  // todo change min
  name: z.string().min(1, 'Name is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().optional(),
  // Add image field: it can be a File object or null/undefined
  // We'll validate its presence if needed in the main form submission
  image: z.any().refine((file) => file instanceof File, 'Must be a valid file').optional(),
});

export type StoreDetailsFormData = z.infer<typeof storeDetailsSchema>;

// Schema for the second step: Social Media Links
// All social links are optional and should be valid URLs if provided
export const socialLinksSchema = z.object({
  instagram: z.string().url('Invalid Instagram URL').optional().or(z.literal('')),
  facebook: z.string().url('Invalid Facebook URL').optional().or(z.literal('')),
  snapchat: z.string().url('Invalid Snapchat URL').optional().or(z.literal('')),
});

export type SocialLinksFormData = z.infer<typeof socialLinksSchema>;

// Combined schema for the entire form
export const fullStoreCreationSchema = storeDetailsSchema.merge(socialLinksSchema);

export type FullStoreCreationFormData = z.infer<typeof fullStoreCreationSchema>;
