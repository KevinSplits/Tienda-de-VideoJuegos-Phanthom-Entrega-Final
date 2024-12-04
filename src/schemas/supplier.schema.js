import { z } from "zod";

export const createSupplierSchema = z.object({
  companyName: z.string({
    required_error: "Company Name is required",
  }),
  contactName: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
  country: z.string().optional(),
});