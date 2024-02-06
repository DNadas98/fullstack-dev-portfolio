export class GithubUserCreateRequestDto {
  readonly githubUsername: number;
  readonly accountId:number;

  constructor(githubUsername: number, accountId: number) {
    this.githubUsername = githubUsername;
    this.accountId = accountId;
  }
}
