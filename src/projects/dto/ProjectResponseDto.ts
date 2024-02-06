import {GithubUserResponseDto} from "./GithubUserResponseDto";
import {GithubCodeSnippetResponseDto} from "./GithubCodeSnippetResponseDto";
import {ProjectImageResponseDto} from "./ProjectImageResponseDto";

export class ProjectResponseDto {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly ownerId: number;
  readonly contributors: GithubUserResponseDto[];
  readonly name: string;
  readonly branchName: string;
  readonly codeSnippets: GithubCodeSnippetResponseDto[];
  readonly images: ProjectImageResponseDto[];
  readonly readmePath?: string | undefined;
  readonly readmeFormat?: string | undefined;
  readonly licensePath?: string | undefined;
  readonly licenseFormat?: string | undefined;
  readonly deploymentUrl?: string | undefined;

  constructor(id: number, createdAt: Date, updatedAt: Date, ownerId: number, contributors: GithubUserResponseDto[], name: string, branchName: string, codeSnippets: GithubCodeSnippetResponseDto[], images: ProjectImageResponseDto[], readmePath: string | undefined, readmeFormat: string | undefined, licensePath: string | undefined, licenseFormat: string | undefined, deploymentUrl: string | undefined) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.ownerId = ownerId;
    this.contributors = contributors;
    this.name = name;
    this.branchName = branchName;
    this.codeSnippets = codeSnippets;
    this.images = images;
    this.readmePath = readmePath;
    this.readmeFormat = readmeFormat;
    this.licensePath = licensePath;
    this.licenseFormat = licenseFormat;
    this.deploymentUrl = deploymentUrl;
  }
}
