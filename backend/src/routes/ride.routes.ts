import express from "express";
import {
  ConfirmRide,
  CreateRide,
  getFare,
} from "../controller/ride.controller";
import { authCaptain, authUser } from "../middleware/auth.middleware";

export const RideRouter = express.Router();

RideRouter.post("/create", authUser, CreateRide);

RideRouter.get("/get-fare", authUser, getFare);

RideRouter.post("/confirm", authCaptain, ConfirmRide);
