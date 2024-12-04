import { z } from "zod";
import { captainModel } from "../models/captain.model";
import {
  CaptainInput,
  captainRegisterValidation,
} from "../zod/captainValidation";

export const createCaptain = async ({
  fullname,
  email,
  password,
  vehicle,
}: CaptainInput) => {
  try {
    captainRegisterValidation.parse({
      fullname,
      email,
      password,
      vehicle,
    });

    const captain = await captainModel.create({
      fullname,
      email,
      password,
      vehicle,
    });

    return captain;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(error.errors.map((e) => e.message).join(", "));
    } else {
      throw error;
    }
  }
};
