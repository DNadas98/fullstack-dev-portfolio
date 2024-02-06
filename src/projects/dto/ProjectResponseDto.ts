import {GithubUserResponseDto} from "./GithubUserResponseDto";
import {GithubCodeSnippetResponseDto} from "./GithubCodeSnippetResponseDto";
import {GithubImageResponseDto} from "./GithubImageResponseDto";

export class ProjectResponseDto {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly owner: GithubUserResponseDto;
  readonly contributors: GithubUserResponseDto[];
  readonly name: string;
  readonly branchName: string;
  readonly readmePath?: string;
  readonly readmeFormat?: string;
  readonly licensePath?: string;
  readonly licenseFormat?: string;
  readonly deploymentUrl: string;
  readonly codeSnippets: GithubCodeSnippetResponseDto[];
  readonly images: GithubImageResponseDto[];


  constructor(id: number, createdAt: Date, updatedAt: Date, owner: GithubUserResponseDto, contributors: GithubUserResponseDto[], name: string, branchName: string, readmePath: string, readmeFormat: string, licensePath: string, licenseFormat: string, deploymentUrl: string, codeSnippets: GithubCodeSnippetResponseDto[], images: GithubImageResponseDto[]) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.owner = owner;
    this.contributors = contributors;
    this.name = name;
    this.branchName = branchName;
    this.readmePath = readmePath;
    this.readmeFormat = readmeFormat;
    this.licensePath = licensePath;
    this.licenseFormat = licenseFormat;
    this.deploymentUrl = deploymentUrl;
    this.codeSnippets = codeSnippets;
    this.images = images;
  }
}
