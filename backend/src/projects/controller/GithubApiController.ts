import {Controller, Get, Param, Req} from "@nestjs/common";
import {Request} from "express";
import {ProjectService} from "../service/ProjectService";
import {DataResponseDto} from "../../common/dto/DataResponseDto";
import {validateId} from "../../common/validator/validator";
import {ForwardService} from "../../forward/service/ForwardService";
import {GithubUserService} from "../service/GithubUserService";
import {GithubCodeSnippetService} from "../service/GithubCodeSnippetService";
import {Throttle} from "@nestjs/throttler";
import {githubApiRateLimiterOptions} from "../../common/config/rateLimiterOptions";

@Controller("/api/v1/github")
export class GithubApiController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly codeSnippetService: GithubCodeSnippetService,
    private readonly githubUserService: GithubUserService,
    private readonly forwardService: ForwardService
  ) {
  }

  @Get("users/:id")
  @Throttle({default: githubApiRateLimiterOptions})
  async getUserById(@Req() req: Request, @Param("id") id: string) {
    validateId(id);
    const user = await this.githubUserService.findById(+id);
    const githubUserData = await this.forwardService.forwardGitHubApiRequest(
      req, `users/${user.githubUsername}`);
    return new DataResponseDto(githubUserData);
  }

  @Get("projects/:id")
  @Throttle({default: githubApiRateLimiterOptions})
  async getProjectById(@Req() req: Request, @Param("id") id: string) {
    validateId(id);
    const project = await this.projectService.findById(+id);
    const projectOwner = await this.githubUserService.findById(project.ownerId);
    const githubProjectData = await this.forwardService.forwardGitHubApiRequest(
      req, `repos/${projectOwner.githubUsername}/${project.name}`);
    return new DataResponseDto(githubProjectData);
  }

  @Get("code-snippets/:id")
  @Throttle({default: githubApiRateLimiterOptions})
  async getCodeSnippetById(@Req() req: Request, @Param("id") id: string) {
    validateId(id);
    const codeSnippet = await this.codeSnippetService.findById(+id);
    const project = await this.projectService.findById(codeSnippet.githubRepositoryId);
    const projectOwner = await this.githubUserService.findById(project.ownerId);
    const githubProjectData = await this.forwardService.forwardGitHubApiRequest(req,
      `repos/${projectOwner.githubUsername}/${project.name}/contents/${codeSnippet.filePath}`);
    return new DataResponseDto(githubProjectData);
  }
}
