import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { ConnectToDb } from "./db/db";
import { UserRouter } from "./routes/user.routes";

ConnectToDb();

dotenv.config();
export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", UserRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
