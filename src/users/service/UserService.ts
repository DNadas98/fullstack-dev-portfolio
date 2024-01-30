import {Injectable} from "@nestjs/common";
import {UserResponsePrivateDto} from "../dto/UserResponsePrivateDto";
import {DatabaseService} from "../../database/service/DatabaseService";
import {User} from "@prisma/client";
import {AccountNotFoundError} from "../../auth/error/AccountNotFoundError";
import {AccountDeactivatedError} from "../../auth/error/AccountDeactivatedError";
import {AccountNotEnabledError} from "../../auth/error/AccountNotEnabledError";
import {UserResponsePublicDto} from "../dto/UserResponsePublicDto";

@Injectable()
export class UserService {
  private readonly prisma: DatabaseService;

  constructor(prisma: DatabaseService) {
    this.prisma = prisma;
  }

  public toUserResponsePrivateDto(user: User): UserResponsePrivateDto {
    return new UserResponsePrivateDto(
      user.id, user.createdAt, user.updatedAt, user.email,
      user.username, user.role, user.enabled, user.active
    );
  }

  public toUserResponsePublicDto(user: User): UserResponsePublicDto {
    return new UserResponsePublicDto(user.id, user.email, user.username, user.role);
  }

  async readAll(): Promise<UserResponsePrivateDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user =>
      this.toUserResponsePrivateDto(user));
  }

  async readById(id: number): Promise<UserResponsePrivateDto> {
    const user = await this.prisma.user.findUnique({
      where: {id: id}
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
    return this.toUserResponsePrivateDto(user);
  }

  async readByEmail(email: string): Promise<UserResponsePrivateDto> {
    const user = await this.prisma.user.findUnique({
      where: {email: email}
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
    return this.toUserResponsePrivateDto(user);
  }

  async updateUserDetailsById(id: number, details: Partial<User>) {
    const updated = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {id: id}
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
        where: {id: id}, data: {...details}
      });
    });
    return this.toUserResponsePrivateDto(updated);
  }

  async updateIsActive(id: number, isActive: boolean): Promise<UserResponsePrivateDto> {
    const updated = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {id: id}
      });
      if (!user) {
        throw new AccountNotFoundError();
      }
      return tx.user.update({
        where: {id: id}, data: {active: isActive}
      });
    });
    return this.toUserResponsePrivateDto(updated);
  }

  async updateIsEnabled(id: number, isEnabled: boolean): Promise<UserResponsePrivateDto> {
    const updated = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {id: id}
      });
      if (!user) {
        throw new AccountNotFoundError();
      }
      return tx.user.update({
        where: {id: id}, data: {enabled: isEnabled}
      });
    });
    return this.toUserResponsePrivateDto(updated);
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {id: id}
      });
      if (!user) {
        throw new AccountNotFoundError();
      }
      return tx.user.delete({
        where: {id: id}
      });
    });
  }
}
