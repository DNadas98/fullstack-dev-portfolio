import { Injectable } from "@nestjs/common";
import { ProjectService } from "../../projects/service/ProjectService";
import { CodeSnippetService } from "../../projects/service/CodeSnippetService";
import { StoredGithubUserService } from "../../projects/service/StoredGithubUserService";
import { ForwardService } from "../../forward/service/ForwardService";
import { Request } from "express";
import { GithubUserResponseDto } from "../dto/GithubUserResponseDto";
import { GithubProjectResponseDto } from "../dto/GithubProjectResponseDto";
import { GithubContentResponseDto } from "../dto/GithubContentResponseDto";
import { StoredGithubUserResponseDto } from "../../projects/dto/StoredGithubUserResponseDto";
import { CodeSnippetResponseDto } from "../../projects/dto/CodeSnippetResponseDto";
import { ProjectImageResponseDto } from "../../projects/dto/ProjectImageResponseDto";
import { GithubProjectDetailsResponseDto } from "../dto/GithubProjectDetailsResponseDto";

@Injectable()
export class GithubApiService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly codeSnippetService: CodeSnippetService,
    private readonly githubUserService: StoredGithubUserService,
    private readonly forwardService: ForwardService
  ) {}

  async getUserById(req: Request, id: number) {
    const user = await this.githubUserService.findById(id);
    const githubUserData: any =
      await this.forwardService.forwardGitHubApiRequest(
        req,
        `users/${user.githubUsername}`
      );
    return new GithubUserResponseDto(githubUserData);
  }

  async getProjects(req: Request) {
    const projects = await this.projectService.findAll();
    const ownerPromises = projects.map((project) =>
      this.githubUserService.findById(project.ownerId).then((owner) => ({
        owner,
        project
      }))
    );
    const owners = await Promise.all(ownerPromises);
    const requestPromises = owners
      .filter(({ owner }) => owner !== undefined)
      .map(({ owner, project }) =>
        this.forwardService
          .forwardGitHubApiRequest(
            req,
            `repos/${owner.githubUsername}/${project.name}`
          )
          .then((projectData) => {
            projectData.displayName = project.displayName;
            return projectData;
          })
      );
    const resolvedData: any[] = await Promise.all(requestPromises);
    return resolvedData.map(
      (projectData) => new GithubProjectResponseDto(projectData)
    );
  }

  async getProjectByProjectName(req: Request, projectName: string) {
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
    const [
      githubOwnerData,
      githubProjectData,
      githubReadmeData,
      githubLicenseData
    ] = await Promise.all(requests);

    const owner = new GithubUserResponseDto(githubOwnerData);
    const project = new GithubProjectResponseDto({
      ...githubProjectData,
      displayName: projectData.project.displayName
    });
    const readme = new GithubContentResponseDto(githubReadmeData);
    const license = githubLicenseData?.name
      ? new GithubContentResponseDto(githubLicenseData)
      : undefined;
    const contributors: StoredGithubUserResponseDto[] =
      projectData.contributors;
    const codeSnippets: CodeSnippetResponseDto[] = projectData.codeSnippets;
    const images: ProjectImageResponseDto[] = projectData.images;

    return new GithubProjectDetailsResponseDto(
      owner,
      project,
      readme,
      license,
      contributors,
      codeSnippets,
      images
    );
  }

  async getCodeSnippetById(req: Request, id: number) {
    const codeSnippet = await this.codeSnippetService.findById(id);
    const project = await this.projectService.findById(
      codeSnippet.githubRepositoryId
    );
    const projectOwner = await this.githubUserService.findById(project.ownerId);
    const githubCodeSnippetData =
      await this.forwardService.forwardGitHubApiRequest(
        req,
        `repos/${projectOwner.githubUsername}/${project.name}/contents/${codeSnippet.filePath}`
      );
    githubCodeSnippetData.displayedDescription = codeSnippet.description;
    githubCodeSnippetData.startLine = codeSnippet.startLine;
    githubCodeSnippetData.endLine = codeSnippet.endLine;
    return new GithubContentResponseDto({
      ...githubCodeSnippetData,
      displayedDescription: codeSnippet.description,
      startLine: codeSnippet.startLine,
      endLine: codeSnippet.endLine
    });
  }
}
