import { Request, Response } from "express";
import { captainRegisterValidation } from "../zod/captainValidation";
import { captainModel } from "../models/captain.model";
import { createCaptain } from "../services/captain.service";

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
