export class ProjectImageResponseDto {
  readonly id: number;
  readonly src: string;
  readonly githubRepositoryId: number;

  constructor(id: number, src: string, githubRepositoryId: number) {
    this.id = id;
    this.src = src;
    this.githubRepositoryId = githubRepositoryId;
  }
}
