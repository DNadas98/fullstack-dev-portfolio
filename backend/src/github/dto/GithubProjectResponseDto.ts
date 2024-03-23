import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";
import { GithubUserResponseDto } from "./GithubUserResponseDto";

class LicenseDto {
  @IsString()
  readonly key: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly spdx_id: string;

  @IsUrl()
  @IsOptional()
  readonly url?: string;

  @IsString()
  readonly node_id: string;

  constructor(license: any) {
    this.key = license.key;
    this.name = license.name;
    this.spdx_id = license.spdx_id;
    this.url = license.url;
    this.node_id = license.node_id;
  }
}

export class GithubProjectResponseDto {
  /* Details */
  @IsInt()
  readonly id: number;

  @IsString()
  readonly node_id: string;

  @IsString()
  readonly name: string;

  @IsString()
  displayName?: string;

  @IsString()
  readonly full_name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsBoolean()
  readonly private: boolean;

  @IsString()
  readonly visibility: string;

  @IsString()
  readonly default_branch: string;

  @IsBoolean()
  readonly allow_forking: boolean;

  @IsBoolean()
  readonly fork: boolean;

  @IsBoolean()
  readonly is_template: boolean;

  /* Owner */

  @ValidateNested()
  @Type(() => GithubUserResponseDto)
  readonly owner: GithubUserResponseDto;

  /* URLs */

  @IsUrl()
  readonly html_url: string;

  @IsUrl()
  readonly url: string;

  @IsUrl()
  readonly git_url: string;

  @IsUrl()
  readonly ssh_url: string;

  @IsUrl()
  readonly clone_url: string;

  @IsUrl()
  readonly svn_url: string;

  @IsUrl()
  @IsOptional()
  readonly mirror_url: string;

  @IsUrl()
  @IsOptional()
  readonly homepage: string;

  /* License */

  @ValidateNested()
  @Type(() => LicenseDto)
  @IsOptional()
  readonly license?: LicenseDto;

  /* Dates */

  @IsDateString()
  readonly created_at: Date;

  @IsDateString()
  readonly updated_at: Date;

  @IsDateString()
  readonly pushed_at: Date;

  /* Stats */

  @IsString()
  readonly language: string;

  @IsNumber()
  @IsPositive()
  readonly size: number;

  @IsNumber()
  readonly forks_count: number;

  @IsNumber()
  readonly forks: number;

  @IsNumber()
  readonly open_issues_count: number;

  @IsNumber()
  readonly open_issues: number;

  @IsArray()
  readonly topics: any[];

  @IsNumber()
  readonly stargazers_count: number;

  @IsNumber()
  readonly watchers: number;

  @IsNumber()
  readonly watchers_count: number;

  @IsNumber()
  readonly network_count: number;

  @IsNumber()
  readonly subscribers_count: number;

  /* Other */

  @IsBoolean()
  readonly has_issues: boolean;

  @IsBoolean()
  readonly has_projects: boolean;

  @IsBoolean()
  readonly has_downloads: boolean;

  @IsBoolean()
  readonly has_wiki: boolean;

  @IsBoolean()
  readonly has_pages: boolean;

  @IsBoolean()
  readonly has_discussions: boolean;

  @IsBoolean()
  readonly archived: boolean;

  @IsBoolean()
  readonly disabled: boolean;

  constructor(projectData: any) {
    this.id = projectData.id;
    this.node_id = projectData.node_id;
    this.name = projectData.name;
    this.displayName = projectData.displayName;
    this.full_name = projectData.full_name;
    this.description = projectData.description;
    this.private = projectData.private;
    this.visibility = projectData.visibility;
    this.default_branch = projectData.default_branch;
    this.allow_forking = projectData.allow_forking;
    this.fork = projectData.fork;
    this.is_template = projectData.is_template;
    this.owner = new GithubUserResponseDto(projectData.owner);
    this.html_url = projectData.html_url;
    this.url = projectData.url;
    this.git_url = projectData.git_url;
    this.ssh_url = projectData.ssh_url;
    this.clone_url = projectData.clone_url;
    this.svn_url = projectData.svn_url;
    this.mirror_url = projectData.mirror_url;
    this.homepage = projectData.homepage;
    this.license = projectData.license
      ? new LicenseDto(projectData.license)
      : undefined;
    this.created_at = projectData.created_at;
    this.updated_at = projectData.updated_at;
    this.pushed_at = projectData.pushed_at;
    this.language = projectData.language;
    this.size = projectData.size;
    this.forks_count = projectData.forks_count;
    this.forks = projectData.forks;
    this.open_issues_count = projectData.open_issues_count;
    this.open_issues = projectData.open_issues;
    this.topics = projectData.topics;
    this.stargazers_count = projectData.stargazers_count;
    this.watchers = projectData.watchers;
    this.watchers_count = projectData.watchers_count;
    this.network_count = projectData.network_count;
    this.subscribers_count = projectData.subscribers_count;
    this.has_issues = projectData.has_issues;
    this.has_projects = projectData.has_projects;
    this.has_downloads = projectData.has_downloads;
    this.has_wiki = projectData.has_wiki;
    this.has_pages = projectData.has_pages;
    this.has_discussions = projectData.has_discussions;
    this.archived = projectData.archived;
    this.disabled = projectData.disabled;
  }
}
