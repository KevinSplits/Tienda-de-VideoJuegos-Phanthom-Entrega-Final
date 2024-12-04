import { z } from "zod";

export const createClienteSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z.string({ required_error: "Email is required" }),  // Corregido el mensaje de error
  phone: z.string({ required_error: "Phone is required" }),        // Corregido el mensaje de error
  address: z.string({ required_error: "Address is required" }),
});
