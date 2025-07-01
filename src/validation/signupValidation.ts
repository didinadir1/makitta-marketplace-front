import { z } from 'zod';

// Schema for the first step (Personal Information)
export const personalInfoSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"), // Basic phone validation
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  actor_type: z.enum(["restaurant", "driver", "customer"]),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmedPassword: z.string().min(8, "Confirm password is required"),
}).refine((data) => data.password === data.confirmedPassword, {
  message: "Passwords don't match",
  path: ["confirmedPassword"], // Set the error on the confirmedPassword field
});


// You might also define a combined schema if needed for the final submission

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
