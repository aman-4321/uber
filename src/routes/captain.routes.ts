import express from "express";
import { registerCaptain } from "../controller/captain.controller";

export const CaptainRouter = express.Router();

CaptainRouter.post("/register", registerCaptain);
