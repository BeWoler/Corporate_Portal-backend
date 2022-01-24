module.exports = function (server) {
    const io = require("socket.io")(server, {
        cors: {
            origin: process.env.CORS_ORIGIN,
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
};
//# sourceMappingURL=socket.js.map