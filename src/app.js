import express from "express";
import morgan from "morgan";
import authRouter from "../routes/auth.router.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/auth", authRouter);

export default app;
