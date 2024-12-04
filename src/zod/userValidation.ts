import z from "zod";

export const userValidation = z.object({
  email: z.string().email("Invalid Email"),
  fullname: z.object({
    firstname: z
      .string()
      .min(3, "First name should be at least 3 characters long"),
    lastname: z.string().optional(),
  }),
  password: z.string().min(6, "Password should be at least 6 characters long"),
});
