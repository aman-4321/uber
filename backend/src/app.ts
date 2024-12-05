import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ConnectToDb } from "./db/db";
import { UserRouter } from "./routes/user.routes";
import cookieParser from "cookie-parser";
import { CaptainRouter } from "./routes/captain.routes";

ConnectToDb();

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/users", UserRouter);
app.use("/captains", CaptainRouter);
