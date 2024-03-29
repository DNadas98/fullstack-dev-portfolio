import { Injectable } from "@nestjs/common";
import { UserResponsePrivateDto } from "../dto/UserResponsePrivateDto";
import { DatabaseService } from "../../database/service/DatabaseService";
import { AccountNotFoundError } from "../../auth/error/AccountNotFoundError";
import { AccountDeactivatedError } from "../../auth/error/AccountDeactivatedError";
import { AccountNotEnabledError } from "../../auth/error/AccountNotEnabledError";
import { UserResponsePublicDto } from "../dto/UserResponsePublicDto";
import { IPasswordEncoder } from "../../auth/service/IPasswordEncoder";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UniqueConstraintError } from "../../common/error/UniqueConstraintError";
import { DtoConverterService } from "../../common/converter/service/DtoConverterService";

@Injectable()
export class UserService {
  private readonly prisma: DatabaseService;
  private readonly passwordEncoder: IPasswordEncoder;
  private readonly dtoConverter: DtoConverterService;

  constructor(
    prisma: DatabaseService,
    passwordEncoder: IPasswordEncoder,
    dtoConverter: DtoConverterService
  ) {
    this.prisma = prisma;
    this.passwordEncoder = passwordEncoder;
    this.dtoConverter = dtoConverter;
  }
  async readAll(): Promise<UserResponsePublicDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => this.dtoConverter.toUserResponsePublicDto(user));
  }

  async readById(id: number): Promise<UserResponsePrivateDto> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });
    if (!user) {
      throw new AccountNotFoundError();
    }
    return this.dtoConverter.toUserResponsePrivateDto(user);
  }

  async readByEmail(email: string): Promise<UserResponsePrivateDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: email }
    });
    if (!user) {
      throw new AccountNotFoundError();
    }
    if (!user.active) {
      throw new AccountDeactivatedError();
    }
    if (!user.enabled) {
      throw new AccountNotEnabledError();
    }
    return this.dtoConverter.toUserResponsePrivateDto(user);
  }

  async updateUsernameById(id: number, username: string) {
    const updated = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id }
      });
      if (!user) {
        throw new AccountNotFoundError();
      }
      if (!user.active) {
        throw new AccountDeactivatedError();
      }
      if (!user.enabled) {
        throw new AccountNotEnabledError();
      }
      return tx.user.update({ where: { id }, data: { username } });
    });
    return this.dtoConverter.toUserResponsePrivateDto(updated);
  }

  async updateEmailById(id: number, email: string) {
    try {
      const updated = await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.findUnique({
          where: { id }
        });
        if (!user) {
          throw new AccountNotFoundError();
        }
        if (!user.active) {
          throw new AccountDeactivatedError();
        }
        if (!user.enabled) {
          throw new AccountNotEnabledError();
        }
        return tx.user.update({ where: { id }, data: { email } });
      });
      return this.dtoConverter.toUserResponsePrivateDto(updated);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        throw new UniqueConstraintError(
          "A User account with the provided e-mail address already exists"
        );
      }
      throw e;
    }
  }

  async updatePasswordById(id: number, password: string) {
    const hashedPassword = await this.passwordEncoder.hash(password);

    const updated = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id }
      });
      if (!user) {
        throw new AccountNotFoundError();
      }
      if (!user.active) {
        throw new AccountDeactivatedError();
      }
      if (!user.enabled) {
        throw new AccountNotEnabledError();
      }
      return tx.user.update({
        where: { id },
        data: { password: hashedPassword }
      });
    });
    return this.dtoConverter.toUserResponsePrivateDto(updated);
  }

  async updateIsActive(
    id: number,
    isActive: boolean
  ): Promise<UserResponsePrivateDto> {
    const updated = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id }
      });
      if (!user) {
        throw new AccountNotFoundError();
      }
      return tx.user.update({
        where: { id },
        data: { active: isActive }
      });
    });
    return this.dtoConverter.toUserResponsePrivateDto(updated);
  }

  async updateIsEnabled(
    id: number,
    isEnabled: boolean
  ): Promise<UserResponsePrivateDto> {
    const updated = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id }
      });
      if (!user) {
        throw new AccountNotFoundError();
      }
      return tx.user.update({
        where: { id },
        data: { enabled: isEnabled }
      });
    });
    return this.dtoConverter.toUserResponsePrivateDto(updated);
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id }
      });
      if (!user) {
        throw new AccountNotFoundError();
      }
      return tx.user.delete({
        where: { id }
      });
    });
  }
}
