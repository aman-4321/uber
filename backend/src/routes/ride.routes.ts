import express from "express";
import {
  ConfirmRide,
  CreateRide,
  EndRide,
  getFare,
  StartRide,
} from "../controller/ride.controller";
import { authCaptain, authUser } from "../middleware/auth.middleware";

export const RideRouter = express.Router();

RideRouter.post("/create", authUser, CreateRide);

RideRouter.get("/get-fare", authUser, getFare);

RideRouter.post("/confirm", authCaptain, ConfirmRide);

RideRouter.get("/start-ride", authCaptain, StartRide);

RideRouter.post("/end-ride", authCaptain, EndRide);
