import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class StoredGithubUserUpdateRequestDto {
  @IsOptional()
  @IsNotEmpty({ message: "GitHub username is missing" })
  @IsString({ message: "Invalid GitHub username format" })
  readonly githubUsername: string | null;
  constructor(githubUsername: string | null = null) {
    this.githubUsername = githubUsername;
  }
}
