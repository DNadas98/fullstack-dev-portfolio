import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { DataResponseDto } from "../../common/dto/DataResponseDto";
import { validateId } from "../../common/validator/validator";
import { AuthGuard } from "../../auth/guard/AuthGuard";
import { RoleGuard, Roles } from "../../auth/guard/RoleGuard";
import { StoredGithubUserService } from "../service/StoredGithubUserService";
import { StoredGithubUserCreateRequestDto } from "../dto/StoredGithubUserCreateRequestDto";
import { StoredGithubUserUpdateRequestDto } from "../dto/StoredGithubUserUpdateRequestDto";
import { MessageResponseDto } from "../../common/dto/MessageResponseDto";

@UseGuards(AuthGuard, RoleGuard)
@Controller("/api/v1/github-users")
export class AdminStoredGithubUserController {
  constructor(private readonly githubUserService: StoredGithubUserService) {}

  @Get()
  @Roles("ADMIN")
  async findAll() {
    return await this.githubUserService.findAll();
  }

  @Get(":id")
  @Roles("ADMIN")
  async findById(@Param("id") id: string) {
    validateId(id);
    const githubUser = await this.githubUserService.findById(+id);
    return new DataResponseDto(githubUser);
  }

  @Post()
  @Roles("ADMIN")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGithubUserDto: StoredGithubUserCreateRequestDto) {
    const created = await this.githubUserService.create(createGithubUserDto);
    return new DataResponseDto(created);
  }

  @Patch(":id")
  @Roles("ADMIN")
  async updateById(
    @Param("id") id: string,
    @Body() updateGithubUserDto: StoredGithubUserUpdateRequestDto
  ) {
    validateId(id);
    const updated = await this.githubUserService.updateById(
      +id,
      updateGithubUserDto
    );
    return new DataResponseDto(updated);
  }

  @Delete(":id")
  @Roles("ADMIN")
  async deleteById(@Param("id") id: string) {
    validateId(id);
    await this.githubUserService.deleteById(+id);
    return new MessageResponseDto(
      `GitHub user with ID ${id} has been deleted successfully`
    );
  }
}
