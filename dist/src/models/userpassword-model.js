"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPasswordModel = void 0;
const mongoose_1 = require("mongoose");
const userPasswordSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    password: { type: String, required: true },
});
exports.UserPasswordModel = (0, mongoose_1.model)("UserPassword", userPasswordSchema);
//# sourceMappingURL=userpassword-model.js.map