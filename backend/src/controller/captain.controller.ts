import { Request, Response } from "express";
import {
  captainLoginValidation,
  captainRegisterValidation,
} from "../zod/captainValidation";
import { captainModel } from "../models/captain.model";
import { createCaptain } from "../services/captain.service";
import { blacklistToken } from "../models/blacklistToken.model";

export const registerCaptain = async (req: Request, res: Response) => {
  const { data, error, success } = captainRegisterValidation.safeParse(
    req.body,
  );

  if (!success) {
    res.status(404).json({
      message: "Invalid Inputs",
      error: error.errors,
    });
    return;
  }

  const { fullname, email, password, vehicle } = data;

  const isCaptainAlreadyExists = await captainModel.findOne({ email });

  if (isCaptainAlreadyExists) {
    res.status(400).json({
      message: "Captain already exists",
    });
    return;
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await createCaptain({
    fullname,
    email,
    password: hashedPassword,
    vehicle,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({
    token,
    captain,
  });
};

export const loginCaptain = async (req: Request, res: Response) => {
  const { data, error, success } = captainLoginValidation.safeParse(req.body);

  if (!success) {
    res.status(404).json({
      message: "Invalid Inputs",
      error: error.errors,
    });
    return;
  }

  const { email, password } = data;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    res.status(401).json({
      message: "Invalid email or password",
    });
    return;
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, captain });
};

export const getCaptainProfile = async (req: Request, res: Response) => {
  res.status(200).json({
    captain: req.captain,
  });
};

export const logoutCaptain = async (req: Request, res: Response) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await blacklistToken.create({ token });

  res.clearCookie("token");

  res.status(200).json({
    message: "Logout successfully",
  });
};
