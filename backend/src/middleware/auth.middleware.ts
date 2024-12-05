import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { userModel } from "../models/user.model";
import { captainModel } from "../models/captain.model";
import { blacklistToken } from "../models/blacklistToken.model";

declare global {
  namespace Express {
    interface Request {
      user?: any;
      captain?: any;
    }
  }
}

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const isBlacklisted = await blacklistToken.findOne({ token: token });

  if (isBlacklisted) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const user = await userModel.findById(decoded._id);

    req.user = user;
    return next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export const authCaptain = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const isBlacklisted = await blacklistToken.findOne({ token: token });

  if (isBlacklisted) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const captain = await captainModel.findById(decoded._id);

    req.captain = captain;
    return next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
