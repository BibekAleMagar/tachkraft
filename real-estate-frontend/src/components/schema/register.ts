import * as z from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
    
  password: z
    .string()
    .min(6, "Password must be 6 characters or more"),
    
  firstName: z
    .string()
    .min(1, "First name is required"),
    
  lastName: z
    .string()
    .min(1, "Last name is required"),
    

});
