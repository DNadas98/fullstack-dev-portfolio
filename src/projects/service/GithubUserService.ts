import {Injectable} from "@nestjs/common";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {UniqueConstraintError} from "../../common/error/UniqueConstraintError";
import {DatabaseService} from "../../database/service/DatabaseService";
import {GithubUserNotFoundError} from "../error/GithubUserNotFoundError";
import {Prisma} from "@prisma/client";
import {DtoConverterService} from "../../common/converter/service/DtoConverterService";
import {GithubUserResponseDto} from "../dto/GithubUserResponseDto";
import {GithubUserCreateRequestDto} from "../dto/GithubUserCreateRequestDto";
import {GithubUserUpdateRequestDto} from "../dto/GithubUserUpdateRequestDto";

@Injectable()
export class GithubUserService {
  private readonly prisma: DatabaseService;
  private readonly dtoConverter: DtoConverterService;

  constructor(databaseService: DatabaseService, dtoConverter: DtoConverterService) {
    this.prisma = databaseService;
    this.dtoConverter = dtoConverter;
  }

  async findAll(): Promise<GithubUserResponseDto[]> {
    const users = await this.prisma.githubUser.findMany({});
    return users.map(user => this.dtoConverter.toGithubUserResponseDto(user));
  }

  async findById(id: number): Promise<GithubUserResponseDto> {
    const user = await this.prisma.githubUser.findUnique({
      where: {id}
    });
    if (!user) {
      throw new GithubUserNotFoundError();
    }
    return this.dtoConverter.toGithubUserResponseDto(user);
  }

  async create(createUserDto: GithubUserCreateRequestDto): Promise<GithubUserResponseDto> {
    try {
      const created = await this.prisma.githubUser.create({
        data: {githubUsername: createUserDto.githubUsername}
      });
      return this.dtoConverter.toGithubUserResponseDto(created);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        throw new UniqueConstraintError(
          "A GitHub User with the provided username already exists"
        );
      }
      throw e;
    }
  }

  async updateById(id: number, updateUserDto: GithubUserUpdateRequestDto): Promise<GithubUserResponseDto> {
    try {
      const updateData: Partial<Prisma.GithubUserCreateInput> = this.getUpdateData(
        updateUserDto
      );
      const updated = await this.prisma.githubUser.update({
        where: {id},
        data: updateData
      });
      return this.dtoConverter.toGithubUserResponseDto(updated);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new UniqueConstraintError(
            "A GitHub User with the provided username already exists"
          );
        } else if (e.code === "P2025") {
          throw new GithubUserNotFoundError();
        }
      }
      throw e;
    }
  }

  /**
   * TODO:extend with profile image src, etc details
   * @param updateUserDto
   * @private
   */
  private getUpdateData(
    updateUserDto: GithubUserUpdateRequestDto
  ): Partial<Prisma.GithubUserCreateInput> {
    const updateData: Partial<Prisma.GithubUserCreateInput> = {};
    if (updateUserDto.githubUsername) updateData.githubUsername = updateUserDto.githubUsername;
    return updateData;
  }

  async deleteById(id: number): Promise<void> {
    try {
      await this.prisma.githubUser.delete({
        where: {id}
      });
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2025") {
        throw new GithubUserNotFoundError();
      }
      throw e;
    }
  }
}
