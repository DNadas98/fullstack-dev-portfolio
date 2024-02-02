import { Body,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus, Patch,
  Req,
  UseGuards
} from "@nestjs/common";
import {Request} from "express";
import {UserService} from "../service/UserService";
import {AuthGuard} from "../../auth/guard/AuthGuard";
import {RoleGuard, Roles} from "../../auth/guard/RoleGuard";
import {DataResponseDto} from "../../common/dto/DataResponseDto";
import {UserUpdateUsernameRequestDto} from "../dto/UserUpdateUsernameRequestDto";
import {UserUpdateEmailRequestDto} from "../dto/UserUpdateEmailRequestDto";
import {UserUpdatePasswordRequestDto} from "../dto/UserUpdatePasswordRequestDto";
import {MessageResponseDto} from "../../common/dto/MessageResponseDto";

@UseGuards(AuthGuard, RoleGuard)
@Controller("api/v1/user")
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @Roles("USER", "ADMIN")
  async getOwnUserDetails(@Req() request: Request) {
    const email: string = request["user"].email;
    const userDetails = await this.userService.readByEmail(email);
    return new DataResponseDto(userDetails);
  }

  @Patch("/username")
  @HttpCode(HttpStatus.OK)
  @Roles("USER", "ADMIN")
  async updateOwnUsername(@Req() request: Request, @Body() updateDto: UserUpdateUsernameRequestDto) {
    const id: string = request["user"].id;

    const userDetails = await this.userService.updateUsernameById(+id, updateDto.username);
    return new DataResponseDto(userDetails);
  }

  @Patch("/email")
  @HttpCode(HttpStatus.OK)
  @Roles("USER", "ADMIN")
  async updateOwnEmail(@Req() request: Request, @Body() updateDto: UserUpdateEmailRequestDto) {
    const id: string = request["user"].id;

    const userDetails = await this.userService.updateEmailById(+id, updateDto.email);
    return new DataResponseDto(userDetails);
  }

  @Patch("/password")
  @HttpCode(HttpStatus.OK)
  @Roles("USER", "ADMIN")
  async updateOwnPassword(@Req() request: Request, @Body() updateDto: UserUpdatePasswordRequestDto) {
    const id: string = request["user"].id;

    const userDetails = await this.userService.updatePasswordById(+id, updateDto.password);
    return new DataResponseDto(userDetails);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @Roles("USER", "ADMIN")
  async deleteOwnAccount(@Req() request: Request) {
    const id: string = request["user"].id;

    await this.userService.deleteById(+id);
    return new MessageResponseDto(`User account has been deleted successfully.`);
  }
}
