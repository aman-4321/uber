import express from "express";
import { authUser } from "../middleware/auth.middleware";
import { getCoordinates, getDistanceTime } from "../controller/map.controller";
import { getAutoCompleteSuggestions } from "../services/maps.service";

export const MapsRouter = express.Router();

MapsRouter.get("/get-coordinates", authUser, getCoordinates);

MapsRouter.get("get-distance-time", authUser, getDistanceTime);

MapsRouter.get("/get-suggestion", authUser, getAutoCompleteSuggestions);
