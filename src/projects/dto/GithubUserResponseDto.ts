import {UserResponsePublicDto} from "../../users/dto/UserResponsePublicDto";
import {ProjectResponseDto} from "./ProjectResponseDto";

export class GithubUserResponseDto {
  readonly id: number;
  readonly githubUsername: number;
  readonly account:UserResponsePublicDto;
  readonly ownedRepositories?:ProjectResponseDto;
  readonly contributedRepositories:ProjectResponseDto[];

  constructor(id: number, githubUsername: number, account: UserResponsePublicDto, ownedRepositories: ProjectResponseDto, contributedRepositories: ProjectResponseDto[]) {
    this.id = id;
    this.githubUsername = githubUsername;
    this.account = account;
    this.ownedRepositories = ownedRepositories;
    this.contributedRepositories = contributedRepositories;
  }
}
