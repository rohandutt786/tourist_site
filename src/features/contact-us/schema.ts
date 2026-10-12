import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Name can only contain alphabets and spaces"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please enter your email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address (e.g. name@example.com)"
    ),

  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number")
    .min(10, "Phone number must be at least 10 digits")
    .regex(
      /^\+?[0-9]{10,14}$/,
      "Please enter a valid 10 to 14 digit phone number (e.g. +91 9876543210 or 9876543210)"
    ),

  departureCity: z
    .string()
    .trim()
    .min(1, "Please enter your departure city")
    .min(2, "Departure city must be at least 2 characters")
    .max(50, "Departure city cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Departure city can only contain alphabets"),

  destination: z
    .string()
    .trim()
    .min(1, "Please enter your destination")
    .min(2, "Destination must be at least 2 characters")
    .max(60, "Destination cannot exceed 60 characters")
    .regex(
      /^[a-zA-Z\s,&'-]+$/,
      "Please enter a valid destination (e.g. Kashmir, Manali, Kerala)"
    ),

  date: z
    .string()
    .trim()
    .min(1, "Please select your travel date"),

  days: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? undefined : Number(val)),
    z
      .number({ message: "Please enter number of days" })
      .int("Days must be a whole number")
      .min(1, "Trip duration must be at least 1 day")
      .max(90, "Trip duration cannot exceed 90 days")
  ),

  persons: z.preprocess(
    (val) => (val === "" || val === undefined || val === null ? undefined : Number(val)),
    z
      .number({ message: "Please enter number of persons" })
      .int("Persons must be a whole number")
      .min(1, "At least 1 person is required")
      .max(100, "Maximum 100 persons per booking")
  ),

  budget: z
    .string()
    .trim()
    .min(1, "Please enter your budget")
    .max(50, "Budget text cannot exceed 50 characters"),

  message: z
    .string()
    .trim()
    .max(1000, "Message cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
});


