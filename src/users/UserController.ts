import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
  UseGuards
} from "@nestjs/common";
import {Request} from "express";
import {UserService} from "./service/UserService";
import {AuthGuard} from "../auth/AuthGuard";
import {RoleGuard, Roles} from "../auth/RoleGuard";
import {DataResponseDto} from "../dto/DataResponseDto";

@UseGuards(AuthGuard, RoleGuard)
@Controller("api/v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @Roles("USER", "ADMIN")
  @HttpCode(HttpStatus.OK)
  async getOwnUserDetails(@Req() request: Request) {
    const email: string = request["user"].email;
    const userDetails = await this.userService.readByEmail(email);
    return new DataResponseDto(userDetails);
  }

  @Get(":id")
  @Roles("ADMIN")
  @HttpCode(HttpStatus.OK)
  async getUserDetailsById(@Param("id") id: string) {
    if (!id || isNaN(parseInt(id))) {
      throw new BadRequestException();
    }
    const userDetails = await this.userService.readById(+id);
    return new DataResponseDto(userDetails);
  }
}
