import {
  GithubCodeSnippet,
  GithubRepository,
  GithubUser,
  ProjectImage,
  User
} from "@prisma/client";
import {UserResponsePrivateDto} from "../../../users/dto/UserResponsePrivateDto";
import {UserResponsePublicDto} from "../../../users/dto/UserResponsePublicDto";
import {GithubUserResponseDto} from "../../../projects/dto/GithubUserResponseDto";
import {ProjectResponseDto} from "../../../projects/dto/ProjectResponseDto";
import {ProjectImageResponseDto} from "../../../projects/dto/ProjectImageResponseDto";
import {
  GithubCodeSnippetResponseDto
} from "../../../projects/dto/GithubCodeSnippetResponseDto";

export class DtoConverterService {
  toUserResponsePrivateDto(user: User): UserResponsePrivateDto {
    return new UserResponsePrivateDto(
      user.id,
      user.createdAt,
      user.updatedAt,
      user.email,
      user.username,
      user.role,
      user.enabled,
      user.active
    );
  }

  toUserResponsePublicDto(user: User): UserResponsePublicDto {
    return new UserResponsePublicDto(
      user.id,
      user.email,
      user.username,
      user.role
    );
  }

  toGithubUserResponseDto(githubUser: GithubUser): GithubUserResponseDto {
    return new GithubUserResponseDto(githubUser.id, githubUser.githubUsername, githubUser.userId);
  }

  toGithubCodeSnippetResponseDto(codeSnippet: GithubCodeSnippet): GithubCodeSnippetResponseDto {
    return new GithubCodeSnippetResponseDto(codeSnippet.id, codeSnippet.createdAt,
      codeSnippet.updatedAt, codeSnippet.displayName, codeSnippet.filePath,
      codeSnippet.format, codeSnippet.startLine, codeSnippet.endLine,
      codeSnippet.description, codeSnippet.githubRepositoryId);
  }

  toProjectImageResponseDto(image: ProjectImage): ProjectImageResponseDto {
    return new ProjectImageResponseDto(image.id, image.src, image.githubRepositoryId);
  }

  toProjectResponseDto(project: GithubRepository, contributors: GithubUser[], codeSnippets: GithubCodeSnippet[], images: ProjectImage[]): ProjectResponseDto {
    const contributorDtos = contributors.map(contributor => this.toGithubUserResponseDto(contributor));
    const codeSnippetDtos = codeSnippets.map(codeSnippet => this.toGithubCodeSnippetResponseDto(codeSnippet));
    const imageDtos = images.map(images => this.toProjectImageResponseDto(images));
    return new ProjectResponseDto(project.id, project.createdAt, project.updatedAt,
      project.ownerId, contributorDtos, project.name, project.branchName, codeSnippetDtos,
      imageDtos, project.readmePath ?? undefined, project.readmeFormat ?? undefined,
      project.licensePath ?? undefined, project.licenseFormat ?? undefined,
      project.deploymentUrl ?? undefined);
  }
}
