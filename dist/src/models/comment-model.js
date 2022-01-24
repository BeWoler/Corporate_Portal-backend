"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = void 0;
const mongoose_1 = require("mongoose");
const commentSchema = new mongoose_1.Schema({
    post: { type: mongoose_1.Schema.Types.ObjectId },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    time: { type: Object },
    text: { type: String, required: true },
});
exports.CommentModel = (0, mongoose_1.model)("Comment", commentSchema);
//# sourceMappingURL=comment-model.js.map