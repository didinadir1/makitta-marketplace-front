import { z } from 'zod';

// Schema for the first step (Personal Information)
export const personalInfoSchema = z.object({
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number must be at least 10 digits'), // Basic validation
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password is required'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'], // Set the error path to confirmPassword
});

// Schema for the second step (Store Details)
export const storeDetailsSchema = z.object({
  storeName: z.string().min(1, 'Store name is required'),
  address: z.string().min(1, 'Address is required'),
  description: z.string().optional(), // Description is optional
});

// You might also define a combined schema if needed for the final submission
export const fullSignupSchema = personalInfoSchema.and(storeDetailsSchema);

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type StoreDetailsFormData = z.infer<typeof storeDetailsSchema>;
export type FullSignupFormData = z.infer<typeof fullSignupSchema>;
