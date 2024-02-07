export class GithubUserResponseDto {
  readonly id: number;
  readonly githubUsername: string;

  constructor(id: number, githubUsername: string) {
    this.id = id;
    this.githubUsername = githubUsername;
  }
}
