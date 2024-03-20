import {GithubProjectOwnerResponseDto} from "./GithubProjectOwnerResponseDto.ts";
import {GithubProjectLicenseResponseDto} from "./GithubProjectLicenseResponseDto.ts";

export interface GithubProjectResponseDto {
  id: number;
  name: string;
  displayName: string;
  private: boolean;
  owner: GithubProjectOwnerResponseDto;
  html_url: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
  pushed_at: string;
  clone_url: string;
  homepage?: string;
  size: number;
  license: GithubProjectLicenseResponseDto;
  stargazers_count: number;
  subscribers_count: number;
  watchers: number;
  language: string;
  allow_forking: boolean;
  forks: number;
  open_issues?: number;
  default_branch: string;
}
