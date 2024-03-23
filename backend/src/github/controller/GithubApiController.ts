import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req
} from "@nestjs/common";
import { Request } from "express";
import { DataResponseDto } from "../../common/dto/DataResponseDto";
import { validateId } from "../../common/validator/validator";
import { Throttle } from "@nestjs/throttler";
import { githubApiRateLimiterOptions } from "../../common/config/rateLimiterOptions";
import { GithubApiService } from "../service/GithubApiService";

@Controller("/api/v1/github")
export class GithubApiController {
  constructor(private readonly githubApiService: GithubApiService) {}

  @Get("users/:id")
  @Throttle({ default: githubApiRateLimiterOptions })
  async getUserById(@Req() req: Request, @Param("id") id: string) {
    validateId(id);
    const githubUse = await this.githubApiService.getUserById(req, +id);
    return new DataResponseDto(githubUse);
  }

  @Get("projects")
  @Throttle({ default: githubApiRateLimiterOptions })
  async getProjects(@Req() req: Request) {
    const githubProjects = await this.githubApiService.getProjects(req);
    return new DataResponseDto(githubProjects);
  }

  @Get("projects/:projectName")
  @Throttle({ default: githubApiRateLimiterOptions })
  async getProjectByProjectName(
    @Req() req: Request,
    @Param("projectName") projectName: string
  ) {
    if (!projectName?.length) {
      throw new BadRequestException("The received project name is invalid");
    }

    const githubProject = await this.githubApiService.getProjectByProjectName(
      req,
      projectName
    );

    return new DataResponseDto(githubProject);
  }

  @Get("code-snippets/:id")
  @Throttle({ default: githubApiRateLimiterOptions })
  async getCodeSnippetById(@Req() req: Request, @Param("id") id: string) {
    validateId(id);
    const githubCodeSnippet = await this.githubApiService.getCodeSnippetById(
      req,
      +id
    );
    return new DataResponseDto(githubCodeSnippet);
  }
}
