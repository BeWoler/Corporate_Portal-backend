import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { router } from "./src/routes/routes";

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
const addUser = (userId, socketId) => {
  !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId })
}
const removeUser = (socketId) => {
  users = users.filter(user => user.socketId !== socketId);
}
const getUser = (userId) => {
  return users.find(user => user.userId === userId);
}
io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  io.emit("welcome", "helloooo");

  socket.on("addUser", userId => {
    addUser(userId, socket.id);
    io.emit("getUsers", users)
  })

  socket.on("sendMessage", ({sender, receiverId, text}) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      sender,
      receiverId,
      text
    })
  })

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users)
  })
});



const connection = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("Connected");
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT} port`);
  });
};

connection();
