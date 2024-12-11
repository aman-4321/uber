import express from "express";
import { authUser } from "../middleware/auth.middleware";
import {
  getAutoCompleteSuggestion,
  getCoordinates,
  getDistanceTime,
} from "../controller/map.controller";

export const MapsRouter = express.Router();

MapsRouter.get("/get-coordinates", authUser, getCoordinates);

MapsRouter.get("/get-distance-time", authUser, getDistanceTime);

MapsRouter.get("/get-suggestions", authUser, getAutoCompleteSuggestion);
