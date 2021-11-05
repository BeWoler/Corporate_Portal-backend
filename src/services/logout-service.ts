import { TokenService } from "../services/token-service";

export class LogoutService {
  public static async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }
}
