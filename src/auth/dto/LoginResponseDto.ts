import {UserResponsePrivateDto} from "../../users/dto/UserResponsePrivateDto";

export class LoginResponseDto {
  constructor(
    private readonly _user: UserResponsePrivateDto, private readonly _accessToken: string, private readonly _refreshToken: string) {
  }

  get user(): UserResponsePrivateDto {
    return this._user;
  }

  get accessToken(): string {
    return this._accessToken;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }
}
