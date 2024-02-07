import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, HttpCode, HttpStatus
} from "@nestjs/common";
import {ProjectService} from "../service/ProjectService";
import {ProjectCreateRequestDto} from "../dto/ProjectCreateRequestDto";
import {ProjectUpdateRequestDto} from "../dto/ProjectUpdateRequestDto";
import {DataResponseDto} from "../../common/dto/DataResponseDto";
import {validateId} from "../../common/regex/validators";
import {AuthGuard} from "../../auth/guard/AuthGuard";
import {RoleGuard, Roles} from "../../auth/guard/RoleGuard";
import {MessageResponseDto} from "../../common/dto/MessageResponseDto";

@UseGuards(AuthGuard, RoleGuard)
@Controller("/api/v1/projects")
export class AdminProjectController {
  constructor(private readonly projectService: ProjectService) {
  }

  @Get()
  @Roles("ADMIN")
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get(":id")
  @Roles("ADMIN")
  async findById(@Param("id") id: string) {
    validateId(id);
    const project = await this.projectService.findById(+id);
    return new DataResponseDto(project);
  }

  @Post()
  @Roles("ADMIN")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProjectDto: ProjectCreateRequestDto) {
    const created = await this.projectService.create(createProjectDto);
    return new DataResponseDto(created);
  }

  @Patch(":id")
  @Roles("ADMIN")
  async updateById(@Param("id") id: string, @Body() updateProjectDto: ProjectUpdateRequestDto) {
    validateId(id);
    const updated = await this.projectService.updateById(+id, updateProjectDto);
    return new DataResponseDto(updated);
  }

  @Delete(":id")
  @Roles("ADMIN")
  async deleteById(@Param("id") id: string) {
    validateId(id);
    await this.projectService.deleteById(+id);
    return new MessageResponseDto(`Project with ID ${id} has been deleted successfully`);
  }
}
