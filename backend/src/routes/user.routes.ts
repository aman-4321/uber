import express from "express";
import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller";
import { authUser } from "../middleware/auth.middleware";

export const UserRouter = express.Router();

UserRouter.post("/register", registerUser);

UserRouter.post("/login", loginUser);

UserRouter.get("/profile", authUser, getUserProfile);

UserRouter.get("/logout", authUser, logoutUser);
