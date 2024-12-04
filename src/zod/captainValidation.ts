import { z } from "zod";

export const captainRegisterValidation = z.object({
  fullname: z.object({
    firstname: z
      .string()
      .min(3, "First name must be at least 3 characters long"),
    lastname: z
      .string()
      .min(3, "Last name must be at least 3 characters long")
      .optional(),
  }),
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  socketId: z.string().optional(),
  status: z
    .object({
      stype: z.string().refine((val) => ["active", "inactive"].includes(val), {
        message: "Status must be either 'active' or 'inactive'",
      }),
    })
    .optional(),
  vehicle: z.object({
    color: z.string().min(3, "Color must be at least 3 characters long"),
    plate: z.string().min(3, "Plate must be at least 3 characters long"),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    vehicleType: z
      .string()
      .refine((val) => ["car", "motorcycle", "auto"].includes(val), {
        message: "Vehicle type must be 'car', 'motorcycle', or 'auto'",
      }),
  }),
  location: z
    .object({
      lat: z.number().optional(),
      lng: z.number().optional(),
    })
    .optional(),
});

export type CaptainInput = z.infer<typeof captainRegisterValidation>;
