import { UserModel } from "../models/user-model";
import bcrypt from "bcrypt";
import { ApiError } from "../exceptions/api-error";
import { TokenService } from "../services/token-service";
import { UserDto } from "../dtos/user-dto";

export class RegistrationService {
  public static async registration(email: string, password: string, username: string) {
    const candidateEmail = await UserModel.findOne({ email });
    const candidateUserName = await UserModel.findOne({ username });
    if (candidateEmail) {
      throw ApiError.BadRequest("Email already exist", []);
    }
    if (candidateUserName) {
      throw ApiError.BadRequest("Username already exist", []);
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      email,
      password: hashPassword,
      username,
    });

    const userDto = new UserDto(user);

    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      user: userDto,
      ...tokens,
    };
  }
}
