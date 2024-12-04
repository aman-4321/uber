import { NextFunction, Request, Response } from "express";
import { userValidation } from "../zod/userValidation";
import { userModel } from "../models/user.model";
import { createUser } from "../services/user.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { data, error, success } = userValidation.safeParse(req.body);

  if (!success) {
    res.status(404).json({
      message: "Invalid Inputs",
      error: error.errors,
    });
    return;
  }

  const { email, password, fullname } = data;

  const hashedPassword = await userModel.hashPassword(password);

  const user = await createUser({
    fullname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();

  res.status(201).json({
    token,
    user,
  });
};
