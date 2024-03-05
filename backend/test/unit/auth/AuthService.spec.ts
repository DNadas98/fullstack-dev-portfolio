import {Test, TestingModule} from "@nestjs/testing";
import {AuthService} from "../../../src/auth/service/AuthService";
import {DatabaseService} from "../../../src/database/service/DatabaseService";
import {IPasswordEncoder} from "../../../src/auth/service/IPasswordEncoder";
import {IJwtService} from "../../../src/auth/service/IJwtService";
import {createMockContext, MockContext} from "../database/mock/context";
import {RegisterRequestDto} from "../../../src/auth/dto/RegisterRequestDto";
import {UserResponsePrivateDto} from "../../../src/users/dto/UserResponsePrivateDto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {UniqueConstraintError} from "../../../src/common/error/UniqueConstraintError";
import {LoginRequestDto} from "../../../src/auth/dto/LoginRequestDto";
import {LoginResponseDto} from "../../../src/auth/dto/LoginResponseDto";
import {InvalidCredentialsError} from "../../../src/auth/error/InvalidCredentialsError";
import {AccountDeactivatedError} from "../../../src/auth/error/AccountDeactivatedError";
import {AccountNotEnabledError} from "../../../src/auth/error/AccountNotEnabledError";
import {Role} from "@prisma/client";
import {JwtPayloadDto} from "../../../src/auth/dto/JwtPayloadDto";
import {
  DtoConverterService
} from "../../../src/common/converter/service/DtoConverterService";
import { RefreshResponseDto } from "../../../src/auth/dto/RefreshResponseDto";

describe("AuthService", () => {
  let service: AuthService;
  let mockPrismaCtx: MockContext;

  const mockPassword = "TestPassword1";
  const mockHashedPassword = "hashedPassword";
  const mockPasswordEncoder = {
    hash: jest.fn().mockResolvedValue(mockHashedPassword),
    compare: jest.fn()
  };

  const mockSignedBearerToken = "signedBearerToken";
  const mockSignedRefreshToken = "signedRefreshToken";
  const mockJwtService = {
    signBearerToken: jest.fn().mockResolvedValue(mockSignedBearerToken),
    signRefreshToken: jest.fn().mockResolvedValue(mockSignedRefreshToken),
    verifyBearerToken: jest.fn(),
    verifyRefreshToken: jest.fn()
  };

  const mockUser = {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: "test@test.test",
    username: "TestUser",
    password: mockHashedPassword,
    role: Role.USER,
    active: true,
    enabled: true
  };

  beforeEach(async () => {
    mockPrismaCtx = createMockContext();

    mockPasswordEncoder.compare.mockResolvedValue(true);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, DtoConverterService,
        {provide: DatabaseService, useValue: mockPrismaCtx.prisma},
        {provide: IPasswordEncoder, useValue: mockPasswordEncoder},
        {provide: IJwtService, useValue: mockJwtService}
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("AuthService register", () => {
    it("should correctly register an enabled user account", async () => {
      const registerRequestDto = new RegisterRequestDto(
        mockUser.email,
        mockPassword,
        mockUser.username
      );
      const expectedRegisterResponseDto = new UserResponsePrivateDto(
        mockUser.id,
        mockUser.createdAt,
        mockUser.updatedAt,
        registerRequestDto.email,
        registerRequestDto.username,
        mockUser.role,
        true,
        mockUser.active
      );
      // Mock ORM response
      mockPrismaCtx.prisma.user.create.mockResolvedValue({
        ...expectedRegisterResponseDto,
        password: mockHashedPassword
      });

      // Act
      const result = await service.register(registerRequestDto, true);

      // Assert
      expect(result).toEqual(expectedRegisterResponseDto);
      expect(mockPasswordEncoder.hash).toHaveBeenCalledWith(
        registerRequestDto.password
      );
      expect(mockPrismaCtx.prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: registerRequestDto.username,
          email: registerRequestDto.email,
          password: mockHashedPassword,
          enabled: true
        }
      });
    });

    it("should correctly register a disabled user account", async () => {
      const registerRequestDto = new RegisterRequestDto(
        "test@test.test",
        "TestPassword1",
        "TestUser1"
      );
      const expectedRegisterResponseDto = new UserResponsePrivateDto(
        mockUser.id,
        mockUser.createdAt,
        mockUser.updatedAt,
        registerRequestDto.email,
        registerRequestDto.username,
        mockUser.role,
        false,
        mockUser.active
      );
      mockPrismaCtx.prisma.user.create.mockResolvedValue({
        ...expectedRegisterResponseDto,
        password: mockHashedPassword
      });

      const result = await service.register(registerRequestDto, false);

      expect(result).toEqual(expectedRegisterResponseDto);
      expect(mockPasswordEncoder.hash).toHaveBeenCalledWith(
        registerRequestDto.password
      );
      expect(mockPrismaCtx.prisma.user.create).toHaveBeenCalledWith({
        data: {
          username: registerRequestDto.username,
          email: registerRequestDto.email,
          password: mockHashedPassword,
          enabled: false
        }
      });
    });

    it("should correctly handle unique constraint error at registration", async () => {
      const registerRequestDto = new RegisterRequestDto(
        mockUser.email,
        mockUser.password,
        mockUser.username
      );
      const ormError = new PrismaClientKnownRequestError(
        "Unique constraint ORM error",
        {
          code: "P2002",
          clientVersion: "clientVersion"
        }
      );
      mockPrismaCtx.prisma.user.create.mockRejectedValue(ormError);

      await expect(service.register(registerRequestDto, true)).rejects.toThrow(
        UniqueConstraintError
      );
    });
  });

  describe("AuthService login", () => {
    it("should successfully log in a user", async () => {
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue({
        ...mockUser
      });
      const loginRequestDto = new LoginRequestDto(mockUser.email, mockPassword);

      const result = await service.login(loginRequestDto);

      expect(result).toBeInstanceOf(LoginResponseDto);
      expect(mockJwtService.signBearerToken).toHaveBeenCalled();
      expect(mockJwtService.signRefreshToken).toHaveBeenCalled();
      expect(result.bearerToken).toEqual(mockSignedBearerToken);
      expect(result.refreshToken).toEqual(mockSignedRefreshToken);
    });

    it("should throw InvalidCredentialsError if user not found", async () => {
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login(new LoginRequestDto(mockUser.email, mockPassword))
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it("should throw InvalidCredentialsError on password mismatch", async () => {
      mockPasswordEncoder.compare.mockResolvedValue(false);

      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        password: "non-matching-hash"
      });

      await expect(
        service.login(new LoginRequestDto(mockUser.email, mockPassword))
      ).rejects.toThrow(InvalidCredentialsError);
    });

    it("should throw AccountDeactivatedError if account is not active", async () => {
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        active: false
      });

      await expect(
        service.login(new LoginRequestDto(mockUser.email, mockPassword))
      ).rejects.toThrow(AccountDeactivatedError);
    });

    it("should throw AccountNotEnabledError if account is not enabled", async () => {
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        enabled: false
      });

      await expect(
        service.login(new LoginRequestDto(mockUser.email, mockPassword))
      ).rejects.toThrow(AccountNotEnabledError);
    });

    it("should check credentials first and throw InvalidCredentialsError if also deactivated and not enabled", async () => {
      mockPasswordEncoder.compare.mockResolvedValue(false);

      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        password: "non-matching-hash",
        active: false,
        enabled: false
      });

      await expect(
        service.login(new LoginRequestDto(mockUser.email, mockPassword))
      ).rejects.toThrow(InvalidCredentialsError);
    });
  });

  describe("AuthService refresh", () => {
    const mockRefreshToken = "mockRefreshToken";
    const mockPayload = {email: mockUser.email};

    beforeEach(() => {
      mockJwtService.verifyRefreshToken.mockResolvedValue(mockPayload);
    });

    it("should successfully refresh the bearer token", async () => {
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(mockUser);


      const result = await service.refresh(mockRefreshToken);

      expect(result).toBeInstanceOf(RefreshResponseDto);
      expect(mockJwtService.signBearerToken).toHaveBeenCalled();
      expect(result.bearerToken).toEqual(mockSignedBearerToken);
      expect(mockJwtService.verifyRefreshToken).toHaveBeenCalledWith(
        mockRefreshToken
      );
      expect(mockJwtService.signBearerToken).toHaveBeenCalledWith(
        new JwtPayloadDto(mockUser.email)
      );
    });

    it("should throw an error if refresh token is invalid", async () => {
      mockJwtService.verifyRefreshToken.mockImplementation(() => {
        throw new InvalidCredentialsError();
      });

      await expect(service.refresh(mockRefreshToken)).rejects.toThrow(
        InvalidCredentialsError
      );
    });

    it("should throw InvalidCredentialsError if user not found", async () => {
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.refresh(mockRefreshToken)).rejects.toThrow(
        InvalidCredentialsError
      );
    });

    it("should throw AccountDeactivatedError if account is not active", async () => {
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        active: false
      });

      await expect(service.refresh(mockRefreshToken)).rejects.toThrow(
        AccountDeactivatedError
      );
    });

    it("should throw AccountNotEnabledError if account is not enabled", async () => {
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue({
        ...mockUser,
        enabled: false
      });

      await expect(service.refresh(mockRefreshToken)).rejects.toThrow(
        AccountNotEnabledError
      );
    });
  });
});
