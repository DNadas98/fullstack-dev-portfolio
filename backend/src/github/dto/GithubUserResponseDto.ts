import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min
} from "class-validator";

export class GithubUserResponseDto {
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @IsInt()
  @Min(1)
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly node_id: string;

  @IsUrl()
  readonly avatar_url: string;

  @IsString()
  @IsOptional()
  readonly gravatar_id: string | null;

  @IsUrl()
  readonly url: string;

  @IsUrl()
  readonly html_url: string;

  @IsUrl()
  readonly followers_url: string;

  @IsUrl()
  readonly following_url: string;

  @IsUrl()
  readonly gists_url: string;

  @IsUrl()
  readonly starred_url: string;

  @IsUrl()
  readonly subscriptions_url: string;

  @IsUrl()
  readonly organizations_url: string;

  @IsUrl()
  readonly repos_url: string;

  @IsUrl()
  readonly events_url: string;

  @IsUrl()
  readonly received_events_url: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @IsBoolean()
  readonly site_admin: boolean;

  @IsString()
  @IsOptional()
  readonly name: string | null;

  @IsString()
  @IsOptional()
  readonly company: string | null;

  @IsUrl()
  @IsOptional()
  readonly blog: string | null;

  @IsString()
  @IsOptional()
  readonly location: string | null;

  @IsEmail()
  @IsOptional()
  readonly email: string | null;

  @IsBoolean()
  readonly hireable: boolean;

  @IsString()
  @IsOptional()
  readonly bio: string | null;

  @IsString()
  @IsOptional()
  readonly twitter_username: string | null;

  @IsInt()
  @Min(0)
  readonly public_repos: number;

  @IsInt()
  @Min(0)
  readonly public_gists: number;

  @IsInt()
  @Min(0)
  readonly followers: number;

  @IsInt()
  @Min(0)
  readonly following: number;

  @IsDateString()
  readonly created_at: Date;

  @IsDateString()
  readonly updated_at: Date;

  constructor(response: any) {
    this.login = response.login;
    this.id = response.id;
    this.node_id = response.node_id;
    this.avatar_url = response.avatar_url;
    this.gravatar_id = response.gravatar_id ?? null;
    this.url = response.url;
    this.html_url = response.html_url;
    this.followers_url = response.followers_url;
    this.following_url = response.following_url;
    this.gists_url = response.gists_url;
    this.starred_url = response.starred_url;
    this.subscriptions_url = response.subscriptions_url;
    this.organizations_url = response.organizations_url;
    this.repos_url = response.repos_url;
    this.events_url = response.events_url;
    this.received_events_url = response.received_events_url;
    this.type = response.type;
    this.site_admin = response.site_admin;
    this.name = response.name ?? null;
    this.company = response.company ?? null;
    this.blog = response.blog ?? null;
    this.location = response.location ?? null;
    this.email = response.email ?? null;
    this.hireable = response.hireable;
    this.bio = response.bio ?? null;
    this.twitter_username = response.twitter_username ?? null;
    this.public_repos = response.public_repos;
    this.public_gists = response.public_gists;
    this.followers = response.followers;
    this.following = response.following;
    this.created_at = new Date(response.created_at);
    this.updated_at = new Date(response.updated_at);
  }
}
