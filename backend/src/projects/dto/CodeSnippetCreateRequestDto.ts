import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CodeSnippetCreateRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly displayName: string;

  @IsString()
  @IsNotEmpty()
  readonly filePath: string;

  @IsString()
  @IsNotEmpty()
  readonly format: string;

  @IsInt()
  @Min(1)
  readonly startLine: number;

  @IsInt()
  @Min(1)
  readonly endLine: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsInt()
  @Min(1)
  readonly githubRepositoryId: number;

  constructor(
    displayName: string,
    filePath: string,
    format: string,
    startLine: number,
    endLine: number,
    description: string,
    githubRepositoryId: number
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
