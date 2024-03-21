export class ProjectResponseDto {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly ownerId: number;
  readonly name: string;
  readonly displayName: string;
  readonly branchName: string;
  readonly readmePath: string | null;
  readonly readmeFormat: string | null;
  readonly licensePath: string | null;
  readonly licenseFormat: string | null;
  readonly deploymentUrl: string | null;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    ownerId: number,
    name: string,
    displayName: string,
    branchName: string,
    readmePath: string | null = null,
    readmeFormat: string | null = null,
    licensePath: string | null = null,
    licenseFormat: string | null = null,
    deploymentUrl: string | null = null
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.ownerId = ownerId;
    this.name = name;
    this.displayName = displayName;
    this.branchName = branchName;
    this.readmePath = readmePath;
    this.readmeFormat = readmeFormat;
    this.licensePath = licensePath;
    this.licenseFormat = licenseFormat;
    this.deploymentUrl = deploymentUrl;
  }
}
