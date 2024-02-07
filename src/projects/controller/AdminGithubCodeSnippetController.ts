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
import {DataResponseDto} from "../../common/dto/DataResponseDto";
import {validateId} from "../../common/regex/validators";
import {AuthGuard} from "../../auth/guard/AuthGuard";
import {RoleGuard, Roles} from "../../auth/guard/RoleGuard";
import {MessageResponseDto} from "../../common/dto/MessageResponseDto";
import {GithubCodeSnippetService} from "../service/GithubCodeSnippetService";
import {
  GithubCodeSnippetCreateRequestDto
} from "../dto/GithubCodeSnippetCreateRequestDto";
import {GithubCodeSnippetResponseDto} from "../dto/GithubCodeSnippetResponseDto";

@UseGuards(AuthGuard, RoleGuard)
@Controller("/api/v1/github-code-snippets")
export class AdminGithubCodeSnippetController {
  constructor(private readonly codeSnippetService: GithubCodeSnippetService) {
  }

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
  async create(@Body() createCodeSnippetDto: GithubCodeSnippetCreateRequestDto) {
    const created = await this.codeSnippetService.create(createCodeSnippetDto);
    return new DataResponseDto(created);
  }

  @Patch(":id")
  @Roles("ADMIN")
  async updateById(@Param("id") id: string, @Body() updateCodeSnippetDto: GithubCodeSnippetResponseDto) {
    validateId(id);
    const updated = await this.codeSnippetService.updateById(+id, updateCodeSnippetDto);
    return new DataResponseDto(updated);
  }

  @Delete(":id")
  @Roles("ADMIN")
  async deleteById(@Param("id") id: string) {
    validateId(id);
    await this.codeSnippetService.deleteById(+id);
    return new MessageResponseDto(`GitHub code snippet with ID ${id} has been deleted successfully`);
  }
}
