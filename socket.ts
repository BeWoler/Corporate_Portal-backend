import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors());

const https = require("https").createServer(app);
const socketIO = require("socket.io")(https, {
  cors: {
    origin: process.env.CORS_ORIGIN_SOCKET,
    credentials: true,
    withCredentials: true,
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

https.listen(3020, () => {
  console.log("Connected");
  socketIO.on("connection", (socket: any) => {
    console.log("socket connected", socket.id);
    socket.on("addUser", (userId: string) => {
      addUser(userId, socket.id);
      socketIO.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ sender, receiverId, text }) => {
      const user = getUser(receiverId);
      if (user) {
        socketIO.to(user.socketId).emit("getMessage", {
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
      socketIO.emit("getUsers", users);
    });
  });
});
