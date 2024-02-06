export class ProjectUpdateRequestDto {
  readonly ownerId?: number;
  readonly contributorId?: number[];
  readonly name?: string;
  readonly branchName?: string;
  readonly readmePath?: string;
  readonly readmeFormat?: string;
  readonly licensePath?: string;
  readonly licenseFormat?: string;
  readonly deploymentUrl?: string;
}
