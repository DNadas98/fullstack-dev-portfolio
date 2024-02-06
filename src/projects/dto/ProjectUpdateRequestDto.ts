import {GithubUserResponseDto} from "./GithubUserResponseDto";

export class ProjectUpdateRequestDto {
  readonly owner?: GithubUserResponseDto;
  readonly contributors?: GithubUserResponseDto[];
  readonly name?: string;
  readonly branchName?: string;
  readonly readmePath?: string;
  readonly readmeFormat?: string;
  readonly licensePath?: string;
  readonly licenseFormat?: string;
  readonly deploymentUrl?: string;
}
