import {Controller, Get, HttpCode, HttpStatus} from "@nestjs/common";
import {DataResponseDto} from "../dto/DataResponseDto";
import {UserResponsePrivateDto} from "./dto/UserResponsePrivateDto";
import {UserService} from "./service/UserService";

@Controller("api/v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOwnUserDetails() {
    const now = new Date(Date.now());
    return new DataResponseDto(new UserResponsePrivateDto(
      1, now, now, "email", "username", "USER", true, true
    ));
  }
}
