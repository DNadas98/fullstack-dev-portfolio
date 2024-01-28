import {UserCreateRequestDto} from "../dto/UserCreateRequestDto";
import {UserUpdateRequestDto} from "../dto/UserUpdateRequestDto";
import {UserResponsePrivateDto} from "../dto/UserResponsePrivateDto";

export abstract class IUserService {
  abstract findAll(): Promise<UserResponsePrivateDto[]>;

  abstract findById(id: number): Promise<UserResponsePrivateDto | null>;

  abstract findByEmail(email: string): Promise<UserResponsePrivateDto | null>;

  abstract create(createUserDto: UserCreateRequestDto): Promise<UserResponsePrivateDto>;

  abstract update(id: number, updateUserDto: UserUpdateRequestDto): Promise<UserResponsePrivateDto>;

  abstract remove(id: number): Promise<void>;
}
