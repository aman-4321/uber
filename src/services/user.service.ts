import { z } from "zod";
import { userValidation } from "../zod/userValidation";
import { userModel } from "../models/user.model";

type UserInput = z.infer<typeof userValidation>;

export const createUser = async ({ fullname, email, password }: UserInput) => {
  try {
    userValidation.parse({ email, password, fullname });

    const user = userModel.create({
      fullname,
      email,
      password,
    });

    return user;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map((e) => e.message).join(", "));
    } else {
      throw error;
    }
  }
};
