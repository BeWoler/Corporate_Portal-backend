"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeModel = void 0;
const mongoose_1 = require("mongoose");
const likeSchema = new mongoose_1.Schema({
    post: { type: mongoose_1.Schema.Types.ObjectId, ref: "Post" },
    user: [{ type: String }],
    like: { type: Object, default: 0 },
});
exports.LikeModel = (0, mongoose_1.model)("Like", likeSchema);
//# sourceMappingURL=like-models.js.map