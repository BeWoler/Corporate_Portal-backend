import { UserModel } from "../models/user-model";
import bcrypt from "bcrypt";
import { ApiError } from "../exceptions/api-error";
import { TokenService } from "../services/token-service";
import { UserDto } from "../dtos/user-dto";
import { UserPasswordModel } from "../models/userpassword-model";

export class LoginService {
  public static async login(username: string, password: string) {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
      throw ApiError.BadRequest("User does not exist", [
        { message: "User does not exist" },
      ]);
    }
    const userPassword = await UserPasswordModel.findOne({ user: user._id });
    const isPassEqu = await bcrypt.compare(password, userPassword.password);
    if (!isPassEqu) {
      throw ApiError.BadRequest("Incorrect password", [
        { message: "Incorrect password" },
      ]);
    }

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({
      _id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      user: user,
      userPassword,
      ...tokens,
    };
  }
  public static async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData._id).populate("friends");
    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({
      _id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    });
    await TokenService.saveToken(user._id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }
}
