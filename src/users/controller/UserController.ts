import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards
} from "@nestjs/common";
import { Request } from "express";
import { UserService } from "../service/UserService";
import { AuthGuard } from "../../auth/guard/AuthGuard";
import { RoleGuard, Roles } from "../../auth/guard/RoleGuard";
import { DataResponseDto } from "../../common/dto/DataResponseDto";

@UseGuards(AuthGuard, RoleGuard)
@Controller("api/v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("details")
  @Roles("USER", "ADMIN")
  @HttpCode(HttpStatus.OK)
  async getOwnUserDetails(@Req() request: Request) {
    const email: string = request["user"].email;
    const userDetails = await this.userService.readByEmail(email);
    return new DataResponseDto(userDetails);
  }
}
