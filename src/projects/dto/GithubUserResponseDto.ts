export class GithubUserResponseDto {
  readonly id: number;
  readonly githubUsername: string;
  readonly accountId: number;

  constructor(id: number, githubUsername: string, accountId: number) {
    this.id = id;
    this.githubUsername = githubUsername;
    this.accountId = accountId;
  }
}
