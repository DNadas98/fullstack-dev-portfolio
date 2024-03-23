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
import { MessageResponseDto } from "../../common/dto/MessageResponseDto";
import { CodeSnippetService } from "../service/CodeSnippetService";
import { CodeSnippetCreateRequestDto } from "../dto/CodeSnippetCreateRequestDto";
import { CodeSnippetResponseDto } from "../dto/CodeSnippetResponseDto";

@UseGuards(AuthGuard, RoleGuard)
@Controller("/api/v1/github-code-snippets")
export class AdminCodeSnippetController {
  constructor(private readonly codeSnippetService: CodeSnippetService) {}

  @Get()
  @Roles("ADMIN")
  async findAll() {
    const codeSnippets = await this.codeSnippetService.findAll();
    return new DataResponseDto(codeSnippets);
  }

  @Get(":id")
  @Roles("ADMIN")
  async findById(@Param("id") id: string) {
    validateId(id);
    const codeSnippet = await this.codeSnippetService.findById(+id);
    return new DataResponseDto(codeSnippet);
  }

  @Post()
  @Roles("ADMIN")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCodeSnippetDto: CodeSnippetCreateRequestDto) {
    const created = await this.codeSnippetService.create(createCodeSnippetDto);
    return new DataResponseDto(created);
  }

  @Patch(":id")
  @Roles("ADMIN")
  async updateById(
    @Param("id") id: string,
    @Body() updateCodeSnippetDto: CodeSnippetResponseDto
  ) {
    validateId(id);
    const updated = await this.codeSnippetService.updateById(
      +id,
      updateCodeSnippetDto
    );
    return new DataResponseDto(updated);
  }

  @Delete(":id")
  @Roles("ADMIN")
  async deleteById(@Param("id") id: string) {
    validateId(id);
    await this.codeSnippetService.deleteById(+id);
    return new MessageResponseDto(
      `GitHub code snippet with ID ${id} has been deleted successfully`
    );
  }
}
