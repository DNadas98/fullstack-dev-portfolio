import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Req
} from "@nestjs/common";
import { Request } from "express";
import { ProjectService } from "../service/ProjectService";
import { DataResponseDto } from "../../common/dto/DataResponseDto";
import { validateId } from "../../common/validator/validator";
import { ForwardService } from "../../forward/service/ForwardService";
import { GithubUserService } from "../service/GithubUserService";
import { GithubCodeSnippetService } from "../service/GithubCodeSnippetService";
import { Throttle } from "@nestjs/throttler";
import { githubApiRateLimiterOptions } from "../../common/config/rateLimiterOptions";

@Controller("/api/v1/github")
export class GithubApiController {
  constructor(
    private readonly projectService: ProjectService,
    private readonly codeSnippetService: GithubCodeSnippetService,
    private readonly githubUserService: GithubUserService,
    private readonly forwardService: ForwardService
  ) {}

  @Get("users/:id")
  @Throttle({ default: githubApiRateLimiterOptions })
  async getUserById(@Req() req: Request, @Param("id") id: string) {
    validateId(id);
    const user = await this.githubUserService.findById(+id);
    const githubUserData = await this.forwardService.forwardGitHubApiRequest(
      req,
      `users/${user.githubUsername}`
    );
    return new DataResponseDto(githubUserData);
  }

  @Get("projects")
  @Throttle({ default: githubApiRateLimiterOptions })
  async getProjects(@Req() req: Request) {
    const projects = await this.projectService.findAll();
    const githubProjects: any[] = [];
    for (const project of projects) {
      try {
        const projectOwner = await this.githubUserService.findById(
          project.ownerId
        );
        const githubProjectData =
          await this.forwardService.forwardGitHubApiRequest(
            req,
            `repos/${projectOwner.githubUsername}/${project.name}`
          );
        githubProjectData.displayName = project.displayName;
        githubProjects.push(githubProjectData);
      } catch (e) {
        console.error(e);
      }
    }
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
    const projectData =
      await this.projectService.findByProjectName(projectName);
    const projectOwner = await this.githubUserService.findById(
      projectData.project.ownerId
    );

    const requests = [
      this.forwardService.forwardGitHubApiRequest(
        req,
        `users/${projectOwner.githubUsername}`
      ),
      this.forwardService.forwardGitHubApiRequest(
        req,
        `repos/${projectOwner.githubUsername}/${projectData.project.name}`
      ),
      this.forwardService.forwardGitHubApiRequest(
        req,
        `repos/${projectOwner.githubUsername}/${projectData.project.name}/contents/${projectData.project.readmePath}`
      ),
      this.forwardService.forwardGitHubApiRequest(
        req,
        `repos/${projectOwner.githubUsername}/${projectData.project.name}/contents/${projectData.project.licensePath}`
      )
    ];
    const [githubOwnerData, githubProjectData, readme, license] =
      await Promise.all(requests);

    githubProjectData.displayName = projectData.project.displayName;
    readme.readmeFormat = projectData.project.readmeFormat;
    license.licenseFormat = projectData.project.licenseFormat;

    return new DataResponseDto({
      owner: githubOwnerData,
      project: githubProjectData,
      readme,
      license,
      contributors: projectData.contributors,
      codeSnippets: projectData.codeSnippets,
      images: projectData.images
    });
  }

  @Get("code-snippets/:id")
  @Throttle({ default: githubApiRateLimiterOptions })
  async getCodeSnippetById(@Req() req: Request, @Param("id") id: string) {
    validateId(id);
    const codeSnippet = await this.codeSnippetService.findById(+id);
    const project = await this.projectService.findById(
      codeSnippet.githubRepositoryId
    );
    const projectOwner = await this.githubUserService.findById(project.ownerId);
    const githubProjectData = await this.forwardService.forwardGitHubApiRequest(
      req,
      `repos/${projectOwner.githubUsername}/${project.name}/contents/${codeSnippet.filePath}`
    );
    githubProjectData.displayedDescription = codeSnippet.description;
    githubProjectData.startLine = codeSnippet.startLine;
    githubProjectData.endLine = codeSnippet.endLine;
    return new DataResponseDto(githubProjectData);
  }
}
