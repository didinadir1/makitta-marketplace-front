import { z } from 'zod';

// Schema for the first step: Store Information
export const storeDetailsSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().optional(), // Description is optional
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
