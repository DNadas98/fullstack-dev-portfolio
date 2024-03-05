import {UserDto} from "./UserDto.ts";

export interface AuthenticationDto {
  readonly user?: UserDto,
  readonly bearerToken?: string
}
