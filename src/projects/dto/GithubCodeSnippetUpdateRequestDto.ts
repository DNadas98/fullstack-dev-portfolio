import {IsInt, IsNotEmpty, IsOptional, IsString, Min} from "class-validator";

export class GithubCodeSnippetUpdateRequestDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly displayName: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly filePath: string | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly format: string | null;

  @IsOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly startLine: number | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly endLine: number | null;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description: string | null;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly githubRepositoryId: number | null;

  /**
   * @param displayName
   * @param filePath
   * @param format
   * @param startLine
   * @param endLine
   * @param description
   * @param githubRepositoryId
   */
  constructor(
    displayName: string | null = null, filePath: string | null = null, format: string | null = null,
    startLine: number | null = null, endLine: number | null = null,
    description: string | null = null, githubRepositoryId: number | null = null
  ) {
    this.displayName = displayName;
    this.filePath = filePath;
    this.format = format;
    this.startLine = startLine;
    this.endLine = endLine;
    this.description = description;
    this.githubRepositoryId = githubRepositoryId;
  }
}
