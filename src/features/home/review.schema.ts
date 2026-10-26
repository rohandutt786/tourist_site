import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number({ message: "Please select a star rating" })
    .int("Rating must be a whole number")
    .min(1, "Please select a star rating (1 to 5 stars)")
    .max(5, "Rating cannot exceed 5 stars"),

  name: z
    .string()
    .trim()
    .min(1, "Please enter your full name")
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please enter your email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address (e.g. name@example.com)"
    ),

  location: z
    .string()
    .trim()
    .min(1, "Please enter your city/location")
    .min(2, "Location must be at least 2 characters")
    .max(60, "Location cannot exceed 60 characters"),

  tour: z
    .string()
    .trim()
    .min(1, "Please select or enter the tour taken"),

  comment: z
    .string()
    .trim()
    .min(1, "Please write your review")
    .min(10, "Please write at least 10 characters describing your experience")
    .max(1000, "Review cannot exceed 1000 characters"),

  hp_website: z.string().optional(),
});

export type ReviewFormData = z.infer<typeof reviewSchema>;
