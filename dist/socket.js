"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
dotenv.config();
const app = (0, express_1.default)();
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
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
http.listen(3050, () => {
    console.log("Connected");
    io.on("connection", (socket) => {
        console.log("socket connected", socket.id);
        socket.on("addUser", (userId) => {
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
//# sourceMappingURL=socket.js.map