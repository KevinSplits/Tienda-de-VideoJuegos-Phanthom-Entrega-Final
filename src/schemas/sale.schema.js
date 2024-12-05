import { z } from "zod";

export const createSaleSchema = z.object({
  customerName: z.string({
    required_error: "Company Name is required",
  }),
  productName: z.string().optional(),
  amount: z.number().optional(),
  unitPrice: z.number().optional(),
  total: z.number().optional(),
});