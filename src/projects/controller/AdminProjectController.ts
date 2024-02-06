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

@UseGuards(AuthGuard, RoleGuard)
@Controller("/api/v1/projects")
export class AdminProjectController {
  constructor(private readonly projectService: ProjectService) {
  }

  @Get()
  @Roles("ADMIN")
  findAll() {
    return this.projectService.findAll();
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
  create(@Body() createProjectDto: ProjectCreateRequestDto) {
    return this.projectService.create(createProjectDto);
  }

  @Patch(":id")
  @Roles("ADMIN")
  updateById(@Param("id") id: string, @Body() updateProjectDto: ProjectUpdateRequestDto) {
    validateId(id);
    return this.projectService.updateById(+id, updateProjectDto);
  }

  @Delete(":id")
  @Roles("ADMIN")
  deleteById(@Param("id") id: string) {
    validateId(id);
    return this.projectService.deleteById(+id);
  }
}
