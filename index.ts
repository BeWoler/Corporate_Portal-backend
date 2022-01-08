import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { router } from "./src/routes/routes";
import { adminRouter } from "./src/Admin/AdminRoutes/routes";

const errorMiddleware = require("./src/middlewares/error-middleware");

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH"],
  })
);

app.use(cookieParser());
app.use("/api", router);
app.use("/admin", adminRouter);
app.use("/files", express.static("./files"));
app.use(errorMiddleware);

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

let users = [];
const addUser = (userId: string, socketId: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};
io.on("connection", (socket: any) => {
  console.log("socket connected", socket.id);
  socket.on("addUser", (userId: string) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ sender, receiverId, text }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        sender,
        receiverId,
        text,
      });
    }
    return;
  });

  socket.on("disconnect", () => {
    console.log(`a user ${socket.id} disconnected`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

const connection = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected");
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT} port`);
  });
};

connection();
