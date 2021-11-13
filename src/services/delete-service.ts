import { UserModel } from "../models/user-model";
import { TokenService } from "./token-service";

export class DeleteService {
  public static async delete(refreshToken: string, username: string) {
    const token = await TokenService.removeToken(refreshToken);
    const user = await UserModel.deleteOne({ username });
    return { user, token };
  }
}
