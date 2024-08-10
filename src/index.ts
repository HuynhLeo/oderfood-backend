// import express from "express";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";
import cors from "cors";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config();
const express = require("express");

import { Request, Response } from "express";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"));

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.use("/api/my/user", myUserRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
