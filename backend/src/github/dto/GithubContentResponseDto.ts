import {
  IsString,
  IsInt,
  IsUrl,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
  IsNumber,
  IsPositive
} from "class-validator";
import { Type } from "class-transformer";

class LinksDto {
  @IsUrl()
  readonly self: string;

  @IsUrl()
  readonly git: string;

  @IsUrl()
  readonly html: string;

  constructor(links: any) {
    this.self = links.self;
    this.git = links.git;
    this.html = links.html;
  }
}

export class GithubContentResponseDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly startLine?: number;
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly endLine?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly displayedDescription?: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly path: string;

  @IsString()
  @IsNotEmpty()
  readonly sha: string;

  @IsInt()
  readonly size: number;

  @IsUrl()
  readonly url: string;

  @IsUrl()
  readonly html_url: string;

  @IsUrl()
  readonly git_url: string;

  @IsUrl()
  readonly download_url: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly encoding: string;

  @ValidateNested()
  @Type(() => LinksDto)
  readonly _links: LinksDto;

  constructor(codeSnippetData: any) {
    this.displayedDescription = codeSnippetData?.displayedDescription;
    this.startLine = codeSnippetData?.startLine;
    this.endLine = codeSnippetData?.endLine;
    this.name = codeSnippetData.name;
    this.path = codeSnippetData.path;
    this.sha = codeSnippetData.sha;
    this.size = codeSnippetData.size;
    this.url = codeSnippetData.url;
    this.html_url = codeSnippetData.html_url;
    this.git_url = codeSnippetData.git_url;
    this.download_url = codeSnippetData.download_url;
    this.type = codeSnippetData.type;
    this.content = codeSnippetData.content;
    this.encoding = codeSnippetData.encoding;
    this._links = new LinksDto(codeSnippetData._links);
  }
}
