import {UserResponsePrivateDto} from "../../users/dto/UserResponsePrivateDto";

export class LoginResponseDto {
  readonly user: UserResponsePrivateDto;
  readonly bearerToken: string;
  readonly refreshToken: string;

  constructor(
    user: UserResponsePrivateDto,
    bearerToken: string,
    refreshToken: string
  ) {
    this.user = user;
    this.bearerToken = bearerToken;
    this.refreshToken = refreshToken;
  }
}
