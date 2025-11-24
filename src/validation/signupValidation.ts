import {z} from 'zod';

// Schema for the first step (Personal Information)
export const personalInfoSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"), // Basic phone validation
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmed_password: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.password === data.confirmed_password, {
  message: "Passwords don't match",
  path: ["confirmed_password"], // Set the error on the confirmed_password field
});


// You might also define a combined schema if needed for the final submission

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
