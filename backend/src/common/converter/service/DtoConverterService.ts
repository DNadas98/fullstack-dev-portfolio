import {
  GithubCodeSnippet,
  GithubRepository,
  GithubUser,
  ProjectImage,
  User
} from "@prisma/client";
import { UserResponsePrivateDto } from "../../../users/dto/UserResponsePrivateDto";
import { UserResponsePublicDto } from "../../../users/dto/UserResponsePublicDto";
import { StoredGithubUserResponseDto } from "../../../projects/dto/StoredGithubUserResponseDto";
import { ProjectResponseDto } from "../../../projects/dto/ProjectResponseDto";
import { ProjectImageResponseDto } from "../../../projects/dto/ProjectImageResponseDto";
import { CodeSnippetResponseDto } from "../../../projects/dto/CodeSnippetResponseDto";
import { MailOptionsDto } from "../../../mail/dto/MailOptionsDto";
import { ContactFormRequestDto } from "../../../mail/dto/ContactFormRequestDto";
import { ProjectDetailsResponseDto } from "../../../projects/dto/ProjectDetailsResponseDto";

export class DtoConverterService {
  /**
   * users
   */

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

  /**
   * projects
   */

  toGithubUserResponseDto(githubUser: GithubUser): StoredGithubUserResponseDto {
    return new StoredGithubUserResponseDto(
      githubUser.id,
      githubUser.githubUsername
    );
  }

  toGithubCodeSnippetResponseDto(
    codeSnippet: GithubCodeSnippet
  ): CodeSnippetResponseDto {
    return new CodeSnippetResponseDto(
      codeSnippet.id,
      codeSnippet.createdAt,
      codeSnippet.updatedAt,
      codeSnippet.displayName,
      codeSnippet.filePath,
      codeSnippet.format,
      codeSnippet.startLine,
      codeSnippet.endLine,
      codeSnippet.description,
      codeSnippet.githubRepositoryId
    );
  }

  toProjectImageResponseDto(image: ProjectImage): ProjectImageResponseDto {
    return new ProjectImageResponseDto(
      image.id,
      image.src,
      image.githubRepositoryId
    );
  }

  toProjectResponseDto(project: GithubRepository): ProjectResponseDto {
    return new ProjectResponseDto(
      project.id,
      project.createdAt,
      project.updatedAt,
      project.ownerId,
      project.name,
      project.displayName,
      project.branchName,
      project.readmePath ?? null,
      project.readmeFormat ?? null,
      project.licensePath ?? null,
      project.licenseFormat ?? null,
      project.deploymentUrl ?? null
    );
  }

  toProjectDetailsResponseDto(
    project: GithubRepository,
    contributors: GithubUser[],
    codeSnippets: GithubCodeSnippet[],
    images: ProjectImage[]
  ): ProjectDetailsResponseDto {
    const contributorDtos =
      contributors?.map(
        (contributor) =>
          new StoredGithubUserResponseDto(
            contributor.id,
            contributor.githubUsername
          )
      ) ?? [];
    const codeSnippetDtos =
      codeSnippets?.map(
        (codeSnippet) =>
          new CodeSnippetResponseDto(
            codeSnippet.id,
            codeSnippet.createdAt,
            codeSnippet.updatedAt,
            codeSnippet.displayName,
            codeSnippet.filePath,
            codeSnippet.format,
            codeSnippet.startLine,
            codeSnippet.endLine,
            codeSnippet.description,
            codeSnippet.githubRepositoryId
          )
      ) ?? [];
    const imageDtos =
      images?.map(
        (image) =>
          new ProjectImageResponseDto(
            image.id,
            image.src,
            image.githubRepositoryId
          )
      ) ?? [];
    return new ProjectDetailsResponseDto(
      this.toProjectResponseDto(project),
      contributorDtos,
      imageDtos,
      codeSnippetDtos
    );
  }

  /**
   * mail
   */

  toMailOptionsDto(
    contactFormDto: ContactFormRequestDto,
    contactEmail: string
  ) {
    return new MailOptionsDto(
      contactEmail,
      contactFormDto.subject,
      contactFormDto.content,
      contactFormDto.isHtml,
      contactFormDto.email,
      contactFormDto.name
    );
  }
}
