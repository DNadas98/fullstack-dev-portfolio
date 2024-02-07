import {
  BadRequestException,
  Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param, Patch, Query,
  UseGuards
} from "@nestjs/common";
import {UserService} from "../service/UserService";
import {AuthGuard} from "../../auth/guard/AuthGuard";
import {RoleGuard, Roles} from "../../auth/guard/RoleGuard";
import {DataResponseDto} from "../../common/dto/DataResponseDto";
import {MessageResponseDto} from "../../common/dto/MessageResponseDto";
import {validateId} from "../../common/validator/validator";

@UseGuards(AuthGuard, RoleGuard)
@Controller("api/v1/admin")
export class AdminController {
  constructor(private readonly userService: UserService) {
  }

  @Get("users")
  @HttpCode(HttpStatus.OK)
  @Roles("ADMIN")
  async getAllUsers() {
    const users = await this.userService.readAll();
    return new DataResponseDto(users);
  }

  @Get("users/:id")
  @HttpCode(HttpStatus.OK)
  @Roles("ADMIN")
  async getUserDetailsById(@Param("id") id: string) {
    validateId(id);
    const userDetails = await this.userService.readById(+id);
    return new DataResponseDto(userDetails);
  }

  @Patch("users/:id")
  @HttpCode(HttpStatus.OK)
  @Roles("ADMIN")
  async updateIsActiveById(@Param("id") id: string, @Query("setActive") setActive: string) {
    validateId(id);
    if (!setActive || (setActive !== "true" && setActive !== "false")) {
      throw new BadRequestException();
    }
    const active = setActive === "true";
    const updated = await this.userService.updateIsActive(+id, active);
    return new DataResponseDto(updated);
  }

  @Delete("users/:id")
  @HttpCode(HttpStatus.OK)
  @Roles("ADMIN")
  async deleteUserById(@Param("id") id: string) {
    validateId(id);
    await this.userService.deleteById(+id);
    return new MessageResponseDto(`User account with ID ${id} has been deleted successfully`);
  }
}
