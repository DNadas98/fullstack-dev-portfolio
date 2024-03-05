import {IsInt, IsNotEmpty, IsOptional, IsString, Min} from "class-validator";

export class ProjectCreateRequestDto {
  @Min(1, {message: "Project owner ID must be greater than or equal to 1"})
  @IsInt({message: "Invalid project owner ID format"})
  readonly ownerId: number;

  @IsNotEmpty({message: "Project name is missing"})
  @IsString({message: "Invalid project name format"})
  readonly name: string;

  @IsNotEmpty({message: "Branch name is missing"})
  @IsString({message: "Invalid branch name format"})
  readonly branchName: string;

  @IsOptional()
  @IsString({message: "Invalid readme path format"})
  readonly readmePath?: string | null;

  @IsOptional()
  @IsString({message: "Invalid readme format"})
  readonly readmeFormat?: string | null;

  @IsOptional()
  @IsString({message: "Invalid license path format"})
  readonly licensePath?: string | null;

  @IsOptional()
  @IsString({message: "Invalid license format"})
  readonly licenseFormat?: string | null;

  @IsOptional()
  @IsString({message: "Invalid deployment URL format"})
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
