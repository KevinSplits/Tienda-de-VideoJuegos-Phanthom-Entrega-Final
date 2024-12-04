import { z } from "zod";

export const createProductoSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),  // Corregido el mensaje de error
  platform: z.string({ required_error: "Platform is required" }),        // Corregido el mensaje de error
  price: z.number({ required_error: "Price is required" }),
});
