import { z } from "zod";

export const mapValidation = z.object({
  address: z.string().min(3),
});

export const distanceTimeValidation = z.object({
  origin: z.string().min(3),
  destination: z.string().min(3),
});

export type mapInput = z.infer<typeof mapValidation>;
export type distanceTimeInput = z.infer<typeof distanceTimeValidation>;
