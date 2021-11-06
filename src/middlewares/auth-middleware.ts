import { ApiError } from "../exceptions/api-error"
import { TokenService } from "../services/token-service";

export = function (req: any, res: any, next: (arg0: any) => void) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
  }
  catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}