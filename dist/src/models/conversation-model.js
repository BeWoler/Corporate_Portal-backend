"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationModel = void 0;
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    members: { type: Array, ref: "User" },
});
exports.ConversationModel = (0, mongoose_1.model)("Conversation", conversationSchema);
//# sourceMappingURL=conversation-model.js.map