import { Request, Response } from "express";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../zod/userValidation";
import { userModel } from "../models/user.model";
import { createUser } from "../services/user.service";
import { blacklistToken } from "../models/blacklistToken.model";

export const registerUser = async (req: Request, res: Response) => {
  const { data, error, success } = userRegisterValidation.safeParse(req.body);

  if (!success) {
    res.status(404).json({
      message: "Invalid Inputs",
      error: error.errors,
    });
    return;
  }

  const { email, password, fullname } = data;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    res.status(400).json({
      message: "User already exists",
    });
    return;
  }

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

export const loginUser = async (req: Request, res: Response) => {
  const { data, error, success } = userLoginValidation.safeParse(req.body);

  if (!success) {
    res.status(404).json({
      message: "Invalid Inputs",
      error: error.errors,
    });
    return;
  }

  const { email, password } = data;

  const user = await userModel
    .findOne({
      email,
    })
    .select("+password");

  if (!user) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const token = user.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({
    token,
    user,
  });
  return;
};

export const getUserProfile = async (req: Request, res: Response) => {
  res.status(200).json(req.user);
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization;

  await blacklistToken.create({ token });

  res.status(200).json({
    message: "Logged Out",
  });
};
