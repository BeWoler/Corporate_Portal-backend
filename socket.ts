import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN_SOCKET,
    credentials: true,
    methods: ["GET", "POST"],
  })
);

const server = require("http").createServer(app);

const io = require("socket.io")(server.listen(process.env.SOCKET_PORT || 3020));

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
