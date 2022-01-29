import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { router } from "./src/routes/routes";
import { adminRouter } from "./src/Admin/AdminRoutes/routes";

const PORT = process.env.PORT;

const errorMiddleware = require("./src/middlewares/error-middleware");

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || process.env.CORS_LOCALHOST_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH"],
  })
);

app.use(cookieParser());
app.use("/api", router);
app.use("/admin", adminRouter);
app.use("/files", express.static("files"));
app.use(errorMiddleware);

const server = require("http").Server(app);

const connection = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected");
  server.listen(PORT || 3010, () => {
    console.log(`Server is running on ${process.env.PORT} port`);
  });
};

connection();
