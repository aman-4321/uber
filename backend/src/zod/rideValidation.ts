import { z } from "zod";

export const rideValidation = z.object({
  pickup: z.string().min(3, "Invalid pickup address"),
  destination: z.string().min(3, "Invalid destination address"),
  vehicleType: z.enum(["auto", "car", "moto"] as const),
});

export const getFareValidation = z.object({
  pickup: z.string().min(3, "Invalid pickup address"),
  destination: z.string().min(3, "Invalid destination address"),
});

export type RideInput = z.infer<typeof rideValidation>;
