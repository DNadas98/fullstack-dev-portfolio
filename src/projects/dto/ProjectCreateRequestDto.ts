import {GithubUserResponseDto} from "./GithubUserResponseDto";

export class ProjectCreateRequestDto {
  readonly owner: GithubUserResponseDto;
  readonly name: string;
  readonly branchName: string;
  readonly readmePath?: string;
  readonly readmeFormat?: string;
  readonly licensePath?: string;
  readonly licenseFormat?: string;
  readonly deploymentUrl?: string;


  constructor(owner: GithubUserResponseDto, name: string, branchName: string, readmePath: string, readmeFormat: string, licensePath: string, licenseFormat: string, deploymentUrl: string) {
    this.owner = owner;
    this.name = name;
    this.branchName = branchName;
    this.readmePath = readmePath;
    this.readmeFormat = readmeFormat;
    this.licensePath = licensePath;
    this.licenseFormat = licenseFormat;
    this.deploymentUrl = deploymentUrl;
  }
}
