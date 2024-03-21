import { Injectable } from "@nestjs/common";
import { ProjectCreateRequestDto } from "../dto/ProjectCreateRequestDto";
import { ProjectUpdateRequestDto } from "../dto/ProjectUpdateRequestDto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UniqueConstraintError } from "../../common/error/UniqueConstraintError";
import { DatabaseService } from "../../database/service/DatabaseService";
import { GithubUserNotFoundError } from "../error/GithubUserNotFoundError";
import { Prisma } from "@prisma/client";
import { DtoConverterService } from "../../common/converter/service/DtoConverterService";
import { ProjectNotFoundError } from "../error/ProjectNotFoundError";
import { ProjectResponseDto } from "../dto/ProjectResponseDto";
import { ProjectDetailsResponseDto } from "../dto/ProjectDetailsResponseDto";

@Injectable()
export class ProjectService {
  private readonly prisma: DatabaseService;
  private readonly dtoConverter: DtoConverterService;

  constructor(
    databaseService: DatabaseService,
    dtoConverter: DtoConverterService
  ) {
    this.prisma = databaseService;
    this.dtoConverter = dtoConverter;
  }

  async findAll(): Promise<ProjectResponseDto[]> {
    const projects = await this.prisma.githubRepository.findMany();
    return projects.map((project) =>
      this.dtoConverter.toProjectResponseDto(project)
    );
  }

  async findById(id: number): Promise<ProjectResponseDto> {
    const project = await this.prisma.githubRepository.findUnique({
      where: { id }
    });
    if (!project) {
      throw new ProjectNotFoundError();
    }
    return this.dtoConverter.toProjectResponseDto(project);
  }

  async findByProjectName(
    projectName: string
  ): Promise<ProjectDetailsResponseDto> {
    const project = await this.prisma.githubRepository.findUnique({
      where: { name: projectName },
      include: {
        contributors: true,
        codeSnippets: true,
        images: true
      }
    });
    if (!project) {
      throw new ProjectNotFoundError();
    }
    return this.dtoConverter.toProjectDetailsResponseDto(
      project,
      project.contributors,
      project.codeSnippets,
      project.images
    );
  }

  async create(
    createProjectDto: ProjectCreateRequestDto
  ): Promise<ProjectResponseDto> {
    try {
      const created = await this.prisma.githubRepository.create({
        data: {
          owner: { connect: { id: createProjectDto.ownerId } },
          contributors: { connect: [{ id: createProjectDto.ownerId }] },
          name: createProjectDto.name,
          displayName: createProjectDto.displayName,
          branchName: createProjectDto.branchName,
          readmePath: createProjectDto.readmePath ?? null,
          readmeFormat: createProjectDto.readmeFormat ?? null,
          licensePath: createProjectDto.licensePath ?? null,
          licenseFormat: createProjectDto.licenseFormat ?? null,
          deploymentUrl: createProjectDto.deploymentUrl ?? null
        }
      });
      return this.dtoConverter.toProjectResponseDto(created);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new UniqueConstraintError(
            "A Github Repository with the provided name already exists"
          );
        } else if (e.code === "P2025") {
          throw new GithubUserNotFoundError();
        }
      }
      throw e;
    }
  }

  async updateById(
    id: number,
    updateProjectDto: ProjectUpdateRequestDto
  ): Promise<ProjectResponseDto> {
    try {
      const updateData: Partial<Prisma.GithubRepositoryCreateInput> =
        this.getUpdateData(updateProjectDto);
      const updated = await this.prisma.githubRepository.update({
        where: { id },
        data: updateData
      });
      return this.dtoConverter.toProjectResponseDto(updated);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new UniqueConstraintError(
            "A Github Repository with the provided name already exists"
          );
        } else if (e.code === "P2025") {
          if (
            e?.meta?.cause &&
            e.meta.cause.toString().includes("GithubUser")
          ) {
            throw new GithubUserNotFoundError();
          }
          throw new ProjectNotFoundError();
        }
      }
      throw e;
    }
  }

  private getUpdateData(
    updateProjectDto: ProjectUpdateRequestDto
  ): Partial<Prisma.GithubRepositoryCreateInput> {
    const updateData: Partial<Prisma.GithubRepositoryCreateInput> = {};
    if (updateProjectDto.name) updateData.name = updateProjectDto.name;
    if (updateProjectDto.displayName)
      updateData.displayName = updateProjectDto.displayName;
    if (updateProjectDto.branchName)
      updateData.branchName = updateProjectDto.branchName;
    if (updateProjectDto.ownerId)
      updateData.owner = { connect: { id: updateProjectDto.ownerId } };
    if (updateProjectDto.readmePath)
      updateData.readmePath = updateProjectDto.readmePath;
    if (updateProjectDto.readmeFormat)
      updateData.readmeFormat = updateProjectDto.readmeFormat;
    if (updateProjectDto.licensePath)
      updateData.licensePath = updateProjectDto.licensePath;
    if (updateProjectDto.licenseFormat)
      updateData.licenseFormat = updateProjectDto.licenseFormat;
    if (updateProjectDto.deploymentUrl)
      updateData.deploymentUrl = updateProjectDto.deploymentUrl;
    return updateData;
  }

  async deleteById(id: number): Promise<void> {
    try {
      await this.prisma.githubRepository.delete({
        where: { id }
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new ProjectNotFoundError();
      }
      throw e;
    }
  }
}
