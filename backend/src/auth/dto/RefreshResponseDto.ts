import {UserResponsePrivateDto} from "../../users/dto/UserResponsePrivateDto";

export class RefreshResponseDto {
  readonly user: UserResponsePrivateDto;
  readonly bearerToken: string;

  constructor(user: UserResponsePrivateDto, bearerToken: string) {
    this.user = user;
    this.bearerToken = bearerToken;
  }
}
