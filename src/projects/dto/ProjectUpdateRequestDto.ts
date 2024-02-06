export class ProjectUpdateRequestDto {
  readonly ownerId?: number | null;
  readonly name?: string | null;
  readonly branchName?: string | null;
  readonly readmePath?: string | null;
  readonly readmeFormat?: string | null;
  readonly licensePath?: string | null;
  readonly licenseFormat?: string | null;
  readonly deploymentUrl?: string | null;


  constructor(
    ownerId: number | null = null,
    name: string | null = null,
    branchName: string | null = null,
    readmePath: string | null = null,
    readmeFormat: string | null = null,
    licensePath: string | null = null,
    licenseFormat: string | null = null,
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
