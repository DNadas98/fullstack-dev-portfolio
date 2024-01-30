import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards
} from "@nestjs/common";
import {UserService} from "../service/UserService";
import {AuthGuard} from "../../auth/guard/AuthGuard";
import {RoleGuard, Roles} from "../../auth/guard/RoleGuard";
import {DataResponseDto} from "../../common/dto/DataResponseDto";

@UseGuards(AuthGuard, RoleGuard)
@Controller("api/v1/admin")
export class AdminController {
  constructor(private readonly userService: UserService) {
  }

  @Get("users/:id")
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
