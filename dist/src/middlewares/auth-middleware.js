"use strict";
const api_error_1 = require("../exceptions/api-error");
const token_service_1 = require("../services/token-service");
module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        const accessToken = authorizationHeader.split(" ")[1];
        if (!accessToken) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        const userData = token_service_1.TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(api_error_1.ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    }
    catch (e) {
        return next();
    }
};
//# sourceMappingURL=auth-middleware.js.map