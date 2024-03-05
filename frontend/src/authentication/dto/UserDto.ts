import {Role} from "./Role.ts";

export interface UserDto {
  readonly username: string;
  readonly email: string;
  readonly role: Role;
}
