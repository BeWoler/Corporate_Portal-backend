"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    conversationId: { type: mongoose_1.Schema.Types.ObjectId },
    sender: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
    date: { type: Date },
});
exports.MessageModel = (0, mongoose_1.model)("Message", messageSchema);
//# sourceMappingURL=message-model.js.map