import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { DatabaseService } from "../../database/service/DatabaseService";
import { GithubCodeSnippet, Prisma } from "@prisma/client";
import { DtoConverterService } from "../../common/converter/service/DtoConverterService";
import { ProjectNotFoundError } from "../error/ProjectNotFoundError";
import { GithubCodeSnippetResponseDto } from "../dto/GithubCodeSnippetResponseDto";
import { CodeSnippetNotFoundError } from "../error/CodeSnippetNotFoundError";
import { GithubCodeSnippetCreateRequestDto } from "../dto/GithubCodeSnippetCreateRequestDto";
import { GithubCodeSnippetUpdateRequestDto } from "../dto/GithubCodeSnippetUpdateRequestDto";

@Injectable()
export class GithubCodeSnippetService {
  private readonly prisma: DatabaseService;
  private readonly dtoConverter: DtoConverterService;

  constructor(
    databaseService: DatabaseService,
    dtoConverter: DtoConverterService
  ) {
    this.prisma = databaseService;
    this.dtoConverter = dtoConverter;
  }

  async findAll(): Promise<GithubCodeSnippetResponseDto[]> {
    const codeSnippets = await this.prisma.githubCodeSnippet.findMany({});
    return codeSnippets.map((codeSnippet) =>
      this.dtoConverter.toGithubCodeSnippetResponseDto(codeSnippet)
    );
  }

  async findById(id: number): Promise<GithubCodeSnippetResponseDto> {
    const codeSnippet = await this.prisma.githubCodeSnippet.findUnique({
      where: { id }
    });
    if (!codeSnippet) {
      throw new CodeSnippetNotFoundError();
    }
    return this.dtoConverter.toGithubCodeSnippetResponseDto(codeSnippet);
  }

  async create(
    createCodeSnippetDto: GithubCodeSnippetCreateRequestDto
  ): Promise<GithubCodeSnippetResponseDto> {
    try {
      if (createCodeSnippetDto.startLine > createCodeSnippetDto.endLine) {
        throw new BadRequestException(
          "Start line number can not be greater than the end line number"
        );
      }
      const created = await this.prisma.githubCodeSnippet.create({
        data: {
          displayName: createCodeSnippetDto.displayName,
          filePath: createCodeSnippetDto.filePath,
          format: createCodeSnippetDto.format,
          startLine: createCodeSnippetDto.startLine,
          endLine: createCodeSnippetDto.endLine,
          description: createCodeSnippetDto.description,
          githubRepository: {
            connect: { id: createCodeSnippetDto.githubRepositoryId }
          }
        }
      });
      return this.dtoConverter.toGithubCodeSnippetResponseDto(created);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new ProjectNotFoundError();
        }
      }
      throw e;
    }
  }

  async updateById(
    id: number,
    updateCodeSnippetDto: GithubCodeSnippetUpdateRequestDto
  ): Promise<GithubCodeSnippetResponseDto> {
    try {
      const updateData: Partial<Prisma.GithubCodeSnippetCreateInput> =
        this.getUpdateData(updateCodeSnippetDto);
      const updated = await this.prisma.$transaction(async (tx) => {
        const codeSnippet = await tx.githubCodeSnippet.findUnique({
          where: { id }
        });
        if (!codeSnippet) {
          throw new CodeSnippetNotFoundError();
        }

        this.validateUpdateData(updateCodeSnippetDto, codeSnippet);

        return tx.githubCodeSnippet.update({
          where: { id },
          data: updateData
        });
      });
      return this.dtoConverter.toGithubCodeSnippetResponseDto(updated);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          if (
            e?.meta?.cause &&
            e.meta.cause.toString().includes("GithubRepository")
          ) {
            throw new ProjectNotFoundError();
          }
        }
      }
      throw e;
    }
  }

  private validateUpdateData(
    updateCodeSnippetDto: GithubCodeSnippetUpdateRequestDto,
    codeSnippet: GithubCodeSnippet
  ): void {
    const message =
      "End line number must be greater than or equal to start line number";
    if (updateCodeSnippetDto.startLine && updateCodeSnippetDto.endLine) {
      if (updateCodeSnippetDto.endLine < updateCodeSnippetDto.startLine) {
        throw new BadRequestException(message);
      }
    } else if (updateCodeSnippetDto.startLine) {
      if (codeSnippet.endLine < updateCodeSnippetDto.startLine) {
        throw new BadRequestException(message);
      }
    } else if (updateCodeSnippetDto.endLine) {
      if (updateCodeSnippetDto.endLine < codeSnippet.startLine) {
        throw new BadRequestException(message);
      }
    }
  }

  private getUpdateData(
    updateCodeSnippetDto: GithubCodeSnippetUpdateRequestDto
  ): Partial<Prisma.GithubCodeSnippetCreateInput> {
    const updateData: Partial<Prisma.GithubCodeSnippetCreateInput> = {};
    if (updateCodeSnippetDto.displayName)
      updateData.displayName = updateCodeSnippetDto.displayName;
    if (updateCodeSnippetDto.filePath)
      updateData.filePath = updateCodeSnippetDto.filePath;
    if (updateCodeSnippetDto.format)
      updateData.format = updateCodeSnippetDto.format;
    if (updateCodeSnippetDto.startLine)
      updateData.startLine = updateCodeSnippetDto.startLine;
    if (updateCodeSnippetDto.endLine)
      updateData.endLine = updateCodeSnippetDto.endLine;
    if (updateCodeSnippetDto.description)
      updateData.description = updateCodeSnippetDto.description;
    if (updateCodeSnippetDto.githubRepositoryId)
      updateData.githubRepository = {
        connect: { id: updateCodeSnippetDto.githubRepositoryId }
      };
    return updateData;
  }

  async deleteById(id: number): Promise<void> {
    try {
      await this.prisma.githubCodeSnippet.delete({
        where: { id }
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new CodeSnippetNotFoundError();
      }
      throw e;
    }
  }
}
