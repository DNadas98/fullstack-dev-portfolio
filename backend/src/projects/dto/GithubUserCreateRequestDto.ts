import { IsNotEmpty, IsString } from "class-validator";

export class GithubUserCreateRequestDto {
  @IsNotEmpty({ message: "GitHub username is missing" })
  @IsString({ message: "Invalid GitHub username format" })
  readonly githubUsername: string;

  constructor(githubUsername: string) {
    this.githubUsername = githubUsername;
  }
}
