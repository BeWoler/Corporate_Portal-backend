"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModel = void 0;
const mongoose_1 = require("mongoose");
const chatSchema = new mongoose_1.Schema({
    messages: [{ type: String }],
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
});
exports.ChatModel = (0, mongoose_1.model)("chat", chatSchema);
//# sourceMappingURL=chat-model.js.map