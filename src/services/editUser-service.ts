import { UserModel } from "../models/user-model";
import { TokenService } from "./token-service";
import { UserDto } from "../dtos/user-dto";
import { UserInfoDto } from "../dtos/userInfo-dto";

export class EditUserService {
  public static async editUser(username: string, { ...args }: Object) {
    const user = await UserModel.findOneAndUpdate({ username }, { ...args });

    const userDto = new UserDto(user);
    const userInfoDto = new UserInfoDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      userInfo: userInfoDto,
      ...tokens,
    };
  }
}
