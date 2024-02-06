export class ProjectCreateRequestDto {
  readonly ownerId: number;
  readonly name: string;
  readonly branchName: string;
  readonly readmePath?: string | null;
  readonly readmeFormat?: string | null;
  readonly licensePath?: string | null;
  readonly licenseFormat?: string | null;
  readonly deploymentUrl?: string | null;

  constructor(
    ownerId: number, name: string, branchName: string,
    readmePath: string | null = null, readmeFormat: string | null = null,
    licensePath: string | null = null, licenseFormat: string | null = null,
    deploymentUrl: string | null = null
  ) {
    this.ownerId = ownerId;
    this.name = name;
    this.branchName = branchName;
    this.readmePath = readmePath;
    this.readmeFormat = readmeFormat;
    this.licensePath = licensePath;
    this.licenseFormat = licenseFormat;
    this.deploymentUrl = deploymentUrl;
  }
}
