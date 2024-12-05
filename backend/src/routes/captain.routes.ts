import express from "express";
import {
  getCaptainProfile,
  loginCaptain,
  logoutCaptain,
  registerCaptain,
} from "../controller/captain.controller";
import { authCaptain } from "../middleware/auth.middleware";

export const CaptainRouter = express.Router();

CaptainRouter.post("/register", registerCaptain);

CaptainRouter.post("/login", loginCaptain);

CaptainRouter.get("/profile", authCaptain, getCaptainProfile);

CaptainRouter.get("/logout", authCaptain, logoutCaptain);
