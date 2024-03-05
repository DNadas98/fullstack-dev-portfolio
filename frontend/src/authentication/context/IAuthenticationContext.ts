import {AuthenticationDto} from "../dto/AuthenticationDto.ts";
import {Role} from "../dto/Role.ts";

export interface IAuthenticationContext {
  authenticate: (authentication: AuthenticationDto) => void;
  logout: () => void;
  getUsername: () => string | undefined;
  getEmail: () => string | undefined;
  getRole: () => Role | undefined;
  getBearerToken: () => string | undefined;
}
