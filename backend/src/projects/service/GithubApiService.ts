import { Injectable } from "@nestjs/common";
import { ProjectService } from "./ProjectService";
import { GithubCodeSnippetService } from "./GithubCodeSnippetService";
import { GithubUserService } from "./GithubUserService";
import { ForwardService } from "../../forward/service/ForwardService";
import { Request } from "express";

@Injectable()
export class GithubApiService {
  constructor(
    private readonly projectService: ProjectService,
    private readonly codeSnippetService: GithubCodeSnippetService,
    private readonly githubUserService: GithubUserService,
    private readonly forwardService: ForwardService
  ) {}

  async getUserById(req: Request, id: number) {
    const user = await this.githubUserService.findById(id);
    const githubUserData = await this.forwardService.forwardGitHubApiRequest(
      req,
      `users/${user.githubUsername}`
    );
    return githubUserData;
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
          .then((response) => {
            response.displayName = project.displayName;
            return response;
          })
      );
    const resolvedRequests = await Promise.all(requestPromises);
    return resolvedRequests;
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
    const [githubOwnerData, githubProjectData, readme, license] =
      await Promise.all(requests);

    githubProjectData.displayName = projectData.project.displayName;
    readme.readmeFormat = projectData.project.readmeFormat;
    license.licenseFormat = projectData.project.licenseFormat;

    return {
      owner: githubOwnerData,
      project: githubProjectData,
      readme,
      license,
      contributors: projectData.contributors,
      codeSnippets: projectData.codeSnippets,
      images: projectData.images
    };
  }

  async getCodeSnippetById(req: Request, id: number) {
    const codeSnippet = await this.codeSnippetService.findById(id);
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
    return githubProjectData;
  }
}
