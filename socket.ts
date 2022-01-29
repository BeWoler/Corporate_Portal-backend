import * as dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();
const http = require("http").Server(app);

const io = require("socket.io")(http || 3020, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    withCredentials: true,
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

http.listen(3050, () => {
  console.log("Connected");
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
});
