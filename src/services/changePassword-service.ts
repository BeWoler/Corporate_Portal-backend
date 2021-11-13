import { UserModel } from "../models/user-model";
import { TokenService } from "../services/token-service";
import { UserDto } from "../dtos/user-dto";
import bcrypt from "bcrypt";

export class ChangePasswordService {
  public static async edit(username: string, password: string) {
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.findOneAndUpdate(
      { username },
      { password: hashPassword }
    );

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }
}
