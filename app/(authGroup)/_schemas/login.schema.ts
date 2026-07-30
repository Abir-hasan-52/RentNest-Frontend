import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .trim(),

  password: z
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(100, "Password is too long"),
});

export type LoginFormData = z.infer<typeof loginSchema>;