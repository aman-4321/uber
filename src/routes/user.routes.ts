import express from "express";
import { registerUser } from "../controller/user.controller";

export const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
