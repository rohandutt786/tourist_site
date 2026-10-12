import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(6, "Phone number is too short")
    .max(15, "Phone number is too long")
    .regex(/^[0-9+ ]+$/, "Invalid phone number"),

  departureCity: z.string().min(2, "Departure city is required"),
  destination: z.string().min(2, "Destination is required"),
  date: z.string().min(1, "Please select a travel date"),
  days: z.coerce.number().min(1, "Number of days must be at least 1"),
  persons: z.coerce.number().min(1, "Persons must be at least 1"),
  budget: z.string().min(1, "Please specify your budget"),
  message: z.string().optional().or(z.literal("")),
});

