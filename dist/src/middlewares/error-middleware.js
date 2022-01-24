"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_error_1 = require("../exceptions/api-error");
module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof api_error_1.ApiError) {
        return res
            .status(err.status)
            .send({ message: err.message, errors: err.errors })
            .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: "Unforeseeable error" }).send({ message: "Unforeseeable error" });
};
//# sourceMappingURL=error-middleware.js.map