"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        cb(null, "././public");
    },
    filename(req, file, cb) {
        if (file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg") {
            cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
        }
        else {
            return cb(new Error("Only .png, .jpg and .jpeg format allowed!"), null);
        }
    },
});
module.exports = (0, multer_1.default)({ storage: storage });
//# sourceMappingURL=multerAvatar-middleware.js.map