import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "../dto/CreateUserDto";
import {UpdateUserDto} from "../dto/UpdateUserDto";
import {UserResponsePrivateDto} from "../dto/UserResponsePrivateDto";
import {IUserService} from "./IUserService";
import {DatabaseService} from "../../database/database.service";
import {User} from "@prisma/client";
import {IPasswordEncoder} from "../../auth/IPasswordEncoder";

@Injectable()
export class PrismaUserService implements IUserService {
  private readonly prisma: DatabaseService;
  private readonly passwordEncoder: IPasswordEncoder;

  constructor(prisma: DatabaseService, passwordEncoder: IPasswordEncoder) {
    this.prisma = prisma;
    this.passwordEncoder = passwordEncoder;
  }

  private toUserResponsePrivateDto(user: User): UserResponsePrivateDto {
    return new UserResponsePrivateDto(
      user.id, user.createdAt, user.updatedAt, user.email, user.username, user.role, user.enabled, user.active
    );
  }

  async findAll(): Promise<UserResponsePrivateDto[]> {
    const users: User[] = await this.prisma.user.findMany();
    return users.map(user => this.toUserResponsePrivateDto(user));
  }

  async findByEmail(email: string): Promise<UserResponsePrivateDto | null> {
    const user: User = await this.prisma.user.findUnique({where: {email}});
    if (!user) {
      return null;
    }
    return this.toUserResponsePrivateDto(user);
  }

  async findById(id: number): Promise<UserResponsePrivateDto | null> {
    const user: User = await this.prisma.user.findUnique({where: {id}});
    if (!user) {
      return null;
    }
    return this.toUserResponsePrivateDto(user);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponsePrivateDto> {
    const hashedPassword = await this.passwordEncoder.hash(createUserDto.password);
    const created = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword
      }
    });
    return this.toUserResponsePrivateDto(created);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponsePrivateDto> {
    const updated = await this.prisma.user.update({
      where: {id}, data: {username: updateUserDto.username}
    });
    return this.toUserResponsePrivateDto(updated);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {id}
    });
  }
}
