import {Injectable} from "@nestjs/common";
import {ProjectCreateRequestDto} from "../dto/ProjectCreateRequestDto";
import {ProjectUpdateRequestDto} from "../dto/ProjectUpdateRequestDto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {UniqueConstraintError} from "../../common/error/UniqueConstraintError";
import {DatabaseService} from "../../database/service/DatabaseService";
import {GithubUserNotFoundError} from "../error/GithubUserNotFoundError";
import {GithubUser} from "@prisma/client";
import {DtoConverterService} from "../../common/converter/service/DtoConverterService";
import {ProjectNotFoundError} from "../error/ProjectNotFoundError";

@Injectable()
export class ProjectService {
  private readonly prisma: DatabaseService;
  private readonly dtoConverter: DtoConverterService;

  constructor(databaseService: DatabaseService, dtoConverter: DtoConverterService) {
    this.prisma = databaseService;
    this.dtoConverter = dtoConverter;
  }

  async findAll() {
    const projects = await this.prisma.githubRepository.findMany({
      include: {
        contributors: true, codeSnippets: true, images: true
      }
    });
    return projects.map(project => this.dtoConverter.toProjectResponseDto(project, project.contributors, project.codeSnippets, project.images));
  }

  async findOne(id: number) {
    const project = await this.prisma.githubRepository.findUnique({
      where: {id},
      include: {
        contributors: true,
        codeSnippets: true,
        images: true
      }
    });
    if (!project) {
      throw new ProjectNotFoundError();
    }
    return this.dtoConverter.toProjectResponseDto(project, project.contributors, project.codeSnippets, project.images);
  }

  async create(createProjectDto: ProjectCreateRequestDto) {
    try {
      const created = await this.prisma.githubRepository.create({
        data: {
          owner: {connect: {id: createProjectDto.ownerId}},
          contributors: {connect: [{id: createProjectDto.ownerId}]},
          name: createProjectDto.name,
          branchName: createProjectDto.branchName,
          readmePath: createProjectDto.readmePath ?? undefined,
          readmeFormat: createProjectDto.readmeFormat ?? undefined,
          licensePath: createProjectDto.licensePath ?? undefined,
          licenseFormat: createProjectDto.licenseFormat ?? undefined,
          deploymentUrl: createProjectDto.deploymentUrl ?? undefined
        },
        include: {
          contributors: true,
          codeSnippets: true,
          images: true
        }
      });
      return this.dtoConverter.toProjectResponseDto(created, created.contributors, created.codeSnippets, created.images);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        throw new UniqueConstraintError(
          "A Github Repository with the provided name already exists"
        );
      }
      throw e;
    }
  }

  async update(id: number, updateProjectDto: ProjectUpdateRequestDto) {
    try {
      const updated = await this.prisma.$transaction(async (tx) => {
        let owner: GithubUser | null = null;
        if (updateProjectDto.ownerId) {
          owner = await tx.githubUser.findUnique({
            where: {id}
          });
          if (!owner) {
            throw new GithubUserNotFoundError("Github user account of the repository owner" +
              " was not found");
          }
        }
        return tx.githubRepository.update({
          where: {id},
          data: {
            owner: {connect: {id: updateProjectDto.ownerId}},
            contributors: {connect: [{id: updateProjectDto.ownerId}]},
            name: updateProjectDto.name,
            branchName: updateProjectDto.branchName,
            readmePath: updateProjectDto.readmePath ?? undefined,
            readmeFormat: updateProjectDto.readmeFormat ?? undefined,
            licensePath: updateProjectDto.licensePath ?? undefined,
            licenseFormat: updateProjectDto.licenseFormat ?? undefined,
            deploymentUrl: updateProjectDto.deploymentUrl ?? undefined
          },
          include: {
            contributors: true,
            codeSnippets: true,
            images: true
          }
        });
      });
      return this.dtoConverter.toProjectResponseDto(updated, updated.contributors, updated.codeSnippets, updated.images);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        throw new UniqueConstraintError(
          "A Github Repository with the provided name already exists"
        );
      }
      throw e;
    }
  }

  async remove(id: number) {
    const deleted = await this.prisma.githubRepository.delete({
      where: {id}, include: {contributors: true, codeSnippets: true, images: true}
    });
    return this.dtoConverter.toProjectResponseDto(deleted, deleted.contributors, deleted.codeSnippets, deleted.images);
  }
}
