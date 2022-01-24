"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModel = void 0;
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post" },
});
exports.LikeModel = (0, mongoose_1.model)("Like", likeSchema);
//# sourceMappingURL=like-model.js.map