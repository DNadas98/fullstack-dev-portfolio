import {Injectable} from "@nestjs/common";
import {IPasswordEncoder} from "./IPasswordEncoder";
import {RegisterRequestDto} from "./dto/RegisterRequestDto";
import {UserResponsePrivateDto} from "../users/dto/UserResponsePrivateDto";
import {LoginResponseDto} from "./dto/LoginResponseDto";
import {DatabaseService} from "../database/database.service";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {UniqueConstraintError} from "../error/UniqueConstraintError";
import {LoginRequestDto} from "./dto/LoginRequestDto";
import {InvalidCredentialsError} from "../error/InvalidCredentialsError";
import {AccountDeactivatedError} from "../error/AccountDeactivatedError";
import {AccountNotEnabledError} from "../error/AccountNotEnabledError";
import {UserService} from "../users/service/UserService";

@Injectable()
export class AuthService {
  private readonly prisma: DatabaseService;
  private readonly userService: UserService;
  private readonly passwordEncoder: IPasswordEncoder;


  constructor(userService: UserService, passwordEncoder: IPasswordEncoder) {
    this.userService = userService;
    this.passwordEncoder = passwordEncoder;
  }

  async register(registerRequestDto: RegisterRequestDto): Promise<UserResponsePrivateDto> {
    try {
      const hashedPassword = await this.passwordEncoder.hash(
        registerRequestDto.password
      );
      const created = await this.prisma.user.create({
        data: {
          username: registerRequestDto.username,
          email: registerRequestDto.email,
          password: hashedPassword
        }
      });
      return this.userService.toUserResponsePrivateDto(created);
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
        throw new UniqueConstraintError(
          "User account with the provided e-mail address already exists"
        );
      }
      throw e;
    }
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: loginRequestDto.email
      }
    });
    if (!user) {
      throw new InvalidCredentialsError();
    }
    const passwordsMatch = await this.passwordEncoder.compare(
      loginRequestDto.password, user.password
    );
    if (!passwordsMatch) {
      throw new InvalidCredentialsError();
    }
    if (!user.active) {
      throw new AccountDeactivatedError();
    }
    if (!user.enabled) {
      throw new AccountNotEnabledError();
    }
    const userDto = this.userService.toUserResponsePrivateDto(user);

    //TODO: Implement JWT signing
    const accessToken = "accessToken";
    const refreshToken = "refreshToken";

    return new LoginResponseDto(userDto, accessToken, refreshToken);
  }

  async refresh(accessToken: string): Promise<string> {
    //TODO: Implement JWT verifying, parsing
    const email = "email";

    const user = await this.prisma.user.findUnique({
      where: {email}
    });
    if (!user) {
      throw new InvalidCredentialsError();
    }
    if (!user.active) {
      throw new AccountDeactivatedError();
    }
    if (!user.enabled) {
      throw new AccountNotEnabledError();
    }

    //TODO: Implement JwtService
    const newAccessToken = "accessToken";
    return newAccessToken;
  }
}
