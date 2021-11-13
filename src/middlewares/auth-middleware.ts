import * as express from "express";
import { ApiError } from "../exceptions/api-error";
import { TokenService } from "../services/token-service";

interface User extends express.Request {
  user: any;
}

export = function (req: User, res: express.Response, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next();
  }
};
