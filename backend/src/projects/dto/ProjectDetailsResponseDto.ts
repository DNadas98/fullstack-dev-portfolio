import { GithubUserResponseDto } from "./GithubUserResponseDto";
import { ProjectImageResponseDto } from "./ProjectImageResponseDto";
import { GithubCodeSnippetResponseDto } from "./GithubCodeSnippetResponseDto";
import { ProjectResponseDto } from "./ProjectResponseDto";

export class ProjectDetailsResponseDto {
  readonly project: ProjectResponseDto;
  readonly contributors: GithubUserResponseDto[];
  readonly images: ProjectImageResponseDto[];
  readonly codeSnippets: GithubCodeSnippetResponseDto[];

  constructor(
    project: ProjectResponseDto,
    contributors: GithubUserResponseDto[],
    images: ProjectImageResponseDto[],
    codeSnippets: GithubCodeSnippetResponseDto[]
  ) {
    this.project = project;
    this.contributors = contributors;
    this.images = images;
    this.codeSnippets = codeSnippets;
  }
}
