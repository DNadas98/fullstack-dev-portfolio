import { GithubUserResponseDto } from "./GithubUserResponseDto";
import { GithubProjectResponseDto } from "./GithubProjectResponseDto";
import { GithubContentResponseDto } from "./GithubContentResponseDto";
import { StoredGithubUserResponseDto } from "../../projects/dto/StoredGithubUserResponseDto";
import { CodeSnippetResponseDto } from "../../projects/dto/CodeSnippetResponseDto";
import { ProjectImageResponseDto } from "../../projects/dto/ProjectImageResponseDto";

export class GithubProjectDetailsResponseDto {
  readonly owner: GithubUserResponseDto;
  readonly project: GithubProjectResponseDto;
  readonly readme: GithubContentResponseDto;
  readonly license?: GithubContentResponseDto;
  readonly contributors: StoredGithubUserResponseDto[];
  readonly codeSnippets: CodeSnippetResponseDto[];
  readonly images: ProjectImageResponseDto[];

  constructor(
    owner: GithubUserResponseDto,
    project: GithubProjectResponseDto,
    readme: GithubContentResponseDto,
    license: GithubContentResponseDto | undefined,
    contributors: StoredGithubUserResponseDto[],
    codeSnippets: CodeSnippetResponseDto[],
    images: ProjectImageResponseDto[]
  ) {
    this.owner = owner;
    this.project = project;
    this.readme = readme;
    this.license = license;
    this.contributors = contributors;
    this.codeSnippets = codeSnippets;
    this.images = images;
  }
}
