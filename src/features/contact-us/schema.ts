import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(6, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+ ]+$/, "Invalid phone number"),

  date: z.string().min(1, "Please select a travel date"),
  destination: z.string().min(2, "Destination is required"),

  //  FIXED HERE
  persons: z.coerce.number().min(1, "Persons must be at least 1"),

  message: z.string().min(5, "Message must be at least 5 characters"),
});
