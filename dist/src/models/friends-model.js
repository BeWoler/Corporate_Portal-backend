"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsModel = void 0;
const mongoose_1 = require("mongoose");
const friendsSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    friends: { type: Array, ref: "User" },
}, { timestamps: true });
exports.FriendsModel = (0, mongoose_1.model)("Friends", friendsSchema);
//# sourceMappingURL=friends-model.js.map