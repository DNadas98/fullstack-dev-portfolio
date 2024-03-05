import {AuthenticationDto} from "./AuthenticationDto.ts";

export interface RefreshResponseDto {
  readonly authentication?: AuthenticationDto;
  readonly error?: string;
}
