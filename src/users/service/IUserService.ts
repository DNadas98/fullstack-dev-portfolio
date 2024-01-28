import {CreateUserDto} from "../dto/CreateUserDto";
import {UpdateUserDto} from "../dto/UpdateUserDto";
import {UserResponsePrivateDto} from "../dto/UserResponsePrivateDto";

export abstract class IUserService {
  abstract findAll(): Promise<UserResponsePrivateDto[]>;

  abstract findById(id: number): Promise<UserResponsePrivateDto | null>;

  abstract findByEmail(email: string): Promise<UserResponsePrivateDto | null>;

  abstract create(createUserDto: CreateUserDto): Promise<UserResponsePrivateDto>;

  abstract update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponsePrivateDto>;

  abstract remove(id: number): Promise<void>;
}
