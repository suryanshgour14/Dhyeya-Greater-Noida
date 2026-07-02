import { z } from "zod";

// Shared applicant-details schema — used by BOTH the client form
// (EnrollDetailsDialog) and the server (create-order route) so validation
// can never drift between the two.

export const PaymentDetailsSchema = z.object({
  fullName:   z.string().trim().min(2, "Enter your full name"),
  fatherName: z.string().trim().min(2, "Enter your father's name"),
  motherName: z.string().trim().min(2, "Enter your mother's name"),
  mobile:     z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email:      z.string().trim().email("Enter a valid email address"),
  state:      z.string().trim().min(2, "Select your state"),
  city:       z.string().trim().min(2, "Enter your city"),
  address:    z.string().trim().min(5, "Enter your full address"),
  pincode:    z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
});

export type PaymentDetails = z.infer<typeof PaymentDetailsSchema>;

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir",
  "Ladakh", "Lakshadweep", "Puducherry",
] as const;
