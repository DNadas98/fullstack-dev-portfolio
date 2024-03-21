export class GithubCodeSnippetResponseDto {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly displayName: string;
  readonly filePath: string;
  readonly format: string;
  readonly startLine: number;
  readonly endLine: number;
  readonly description: string;
  readonly githubRepositoryId: number;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    displayName: string,
    filePath: string,
    format: string,
    startLine: number,
    endLine: number,
    description: string,
    githubRepositoryId: number
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.displayName = displayName;
    this.filePath = filePath;
    this.format = format;
    this.startLine = startLine;
    this.endLine = endLine;
    this.description = description;
    this.githubRepositoryId = githubRepositoryId;
  }
}
