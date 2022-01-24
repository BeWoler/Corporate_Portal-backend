"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    text: { type: String },
    time: { type: Date },
    file: { type: String },
    likes: { type: Array, ref: "Like" },
    comments: { type: Array, ref: "Comment" },
});
exports.PostModel = (0, mongoose_1.model)("Post", postSchema);
//# sourceMappingURL=post-model.js.map