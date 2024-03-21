export interface ProjectCodeSnippetResponseDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  displayName: string;
  filePath: string;
  format: string;
  startLine: number;
  endLine: number;
  description: string;
  githubRepositoryId: number;
}
