import {ProjectResponseDto} from "./ProjectResponseDto";

export class GithubImageResponseDto {
  readonly id: number;
  readonly src: string;
  readonly githubRepository: ProjectResponseDto;
  
  constructor(id: number, src: string, githubRepository: ProjectResponseDto) {
    this.id = id;
    this.src = src;
    this.githubRepository = githubRepository;
  }
}
