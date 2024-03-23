import { StoredGithubUserResponseDto } from "./StoredGithubUserResponseDto";
import { ProjectImageResponseDto } from "./ProjectImageResponseDto";
import { CodeSnippetResponseDto } from "./CodeSnippetResponseDto";
import { ProjectResponseDto } from "./ProjectResponseDto";

export class ProjectDetailsResponseDto {
  readonly project: ProjectResponseDto;
  readonly contributors: StoredGithubUserResponseDto[];
  readonly images: ProjectImageResponseDto[];
  readonly codeSnippets: CodeSnippetResponseDto[];

  constructor(
    project: ProjectResponseDto,
    contributors: StoredGithubUserResponseDto[],
    images: ProjectImageResponseDto[],
    codeSnippets: CodeSnippetResponseDto[]
  ) {
    this.project = project;
    this.contributors = contributors;
    this.images = images;
    this.codeSnippets = codeSnippets;
  }
}
