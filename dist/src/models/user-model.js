"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    avatar: { type: String },
    city: { type: String, default: "" },
    birthday: { type: String, trim: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    description: { type: String, default: "" },
    stack: { type: String, default: "" },
    position: { type: String, default: "" },
    department: { type: String, default: "" },
    education: { type: String, default: "" },
    skype: { type: String, default: "" },
    phone: { type: Number },
    friends: { type: Array, default: [], unique: false, ref: "User" },
    blockedUser: { type: Array, default: [] },
    messagesFromFriend: { type: Boolean, default: false },
    privatePage: { type: Boolean, default: false },
    role: { type: String, default: "member" },
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
//# sourceMappingURL=user-model.js.map