import { z } from "zod";
import { userModel } from "../models/user.model";
import { UserInput, userRegisterValidation } from "../zod/userValidation";

export const createUser = async ({ fullname, email, password }: UserInput) => {
  try {
    userRegisterValidation.parse({ email, password, fullname });

    const user = await userModel.create({
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
