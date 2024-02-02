import {Test, TestingModule} from "@nestjs/testing";
import {UserService} from "../../../src/users/service/UserService";
import {DatabaseService} from "../../../src/database/service/DatabaseService";
import {createMockContext, MockContext} from "../database/mock/context";
import {Role} from "@prisma/client";
import {IPasswordEncoder} from "../../../src/auth/service/IPasswordEncoder";
import {UserResponsePublicDto} from "../../../src/users/dto/UserResponsePublicDto";
import {UserResponsePrivateDto} from "../../../src/users/dto/UserResponsePrivateDto";
import {AccountNotFoundError} from "../../../src/auth/error/AccountNotFoundError";
import {AccountDeactivatedError} from "../../../src/auth/error/AccountDeactivatedError";
import {AccountNotEnabledError} from "../../../src/auth/error/AccountNotEnabledError";

describe("UserService", () => {
  let service: UserService;

  let mockPrismaCtx: MockContext;

  const mockHashedPassword = "hashedPassword";
  const mockPasswordEncoder = {
    hash: jest.fn(),
    compare: jest.fn()
  };

  const mockUsers = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "user1@test.test",
      username: "User1",
      password: mockHashedPassword,
      role: Role.USER,
      active: true,
      enabled: true
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      email: "user2@test.test",
      username: "User2",
      password: mockHashedPassword,
      role: Role.ADMIN,
      active: true,
      enabled: true
    }
  ];

  beforeEach(async () => {
    mockPrismaCtx = createMockContext();
    // Mock the transaction to behave just like the normal PrismaClient mock
    mockPrismaCtx.prisma.$transaction.mockImplementation(async (tx) => {
      return tx(mockPrismaCtx.prisma);
    });

    mockPasswordEncoder.hash.mockResolvedValue(mockHashedPassword);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {provide: DatabaseService, useValue: mockPrismaCtx.prisma},
        {provide: IPasswordEncoder, useValue: mockPasswordEncoder}
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("UserService toUserResponsePrivateDto", () => {
  });

  describe("UserService toUserResponsePublicDto", () => {
  });

  describe("UserService readAll", () => {
    it("should return an array of UserResponsePublicDto objects when users are found", async () => {
      mockPrismaCtx.prisma.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.readAll();

      expect(result.length).toEqual(2);
      expect(result[0]).toBeInstanceOf(UserResponsePublicDto);
      expect(result[0].email).toEqual(mockUsers[0].email);
      expect(result[1]).toBeInstanceOf(UserResponsePublicDto);
      expect(result[1].email).toEqual(mockUsers[1].email);
      expect(mockPrismaCtx.prisma.user.findMany).toHaveBeenCalled();
    });

    it("should return an empty array when no users are found", async () => {
      mockPrismaCtx.prisma.user.findMany.mockResolvedValue([]);

      const result = await service.readAll();

      expect(result).toEqual([]);
      expect(mockPrismaCtx.prisma.user.findMany).toHaveBeenCalled();
    });
  });

  describe("UserService readById", () => {
    it("should return a UserResponsePrivateDto object when user is found", async () => {
      const userId = 1;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(mockUsers[0]);

      const result = await service.readById(userId);

      expect(result).toBeInstanceOf(UserResponsePrivateDto);
      expect(result.id).toEqual(mockUsers[0].id);
      expect(result.email).toEqual(mockUsers[0].email);
      expect(mockPrismaCtx.prisma.user.findUnique).toHaveBeenCalledWith({
        where: {id: userId}
      });
    });

    it("should throw AccountNotFoundError when user is not found", async () => {
      const userId = 3;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.readById(userId)).rejects.toThrow(AccountNotFoundError);
    });

    it("should throw AccountDeactivatedError if the account is not active", async () => {
      const inactiveUser = {...mockUsers[0], active: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(inactiveUser);

      await expect(service.readById(inactiveUser.id)).rejects.toThrow(AccountDeactivatedError);
    });

    it("should throw AccountNotEnabledError if the account is not enabled", async () => {
      const notEnabledUser = {...mockUsers[0], enabled: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(notEnabledUser);

      await expect(service.readById(notEnabledUser.id)).rejects.toThrow(AccountNotEnabledError);
    });
  });

  describe("UserService readByEmail", () => {
    it("should return a UserResponsePrivateDto object when user is found by email", async () => {
      const userEmail = mockUsers[0].email;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(mockUsers[0]);

      const result = await service.readByEmail(userEmail);

      expect(result).toBeInstanceOf(UserResponsePrivateDto);
      expect(result.email).toEqual(userEmail);
      expect(mockPrismaCtx.prisma.user.findUnique).toHaveBeenCalledWith({
        where: {email: userEmail}
      });
    });

    it("should throw AccountNotFoundError when no user is found for the given email", async () => {
      const userEmail = "nonexistent@example.com";
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.readByEmail(userEmail)).rejects.toThrow(AccountNotFoundError);
    });

    it("should throw AccountDeactivatedError if the user's account is not active", async () => {
      const inactiveUserEmail = mockUsers[0].email;
      const inactiveUser = {...mockUsers[0], active: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(inactiveUser);

      await expect(service.readByEmail(inactiveUserEmail)).rejects.toThrow(AccountDeactivatedError);
    });

    it("should throw AccountNotEnabledError if the user's account is not enabled", async () => {
      const notEnabledUserEmail = mockUsers[0].email;
      const notEnabledUser = {...mockUsers[0], enabled: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(notEnabledUser);

      await expect(service.readByEmail(notEnabledUserEmail)).rejects.toThrow(AccountNotEnabledError);
    });
  });

  describe("UserService updateUsernameById", () => {
    it("should successfully update the username of an existing user", async () => {
      const userId = 1;
      const newUsername = "UpdatedUser";
      const updatedUser = {...mockUsers[0], username: newUsername};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(mockUsers[0]);
      mockPrismaCtx.prisma.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateUsernameById(userId, newUsername);

      expect(result).toBeInstanceOf(UserResponsePrivateDto);
      expect(result.username).toEqual(newUsername);
      expect(mockPrismaCtx.prisma.user.update).toHaveBeenCalledWith({
        where: {id: userId},
        data: {username: newUsername}
      });
    });

    it("should throw AccountNotFoundError when no user is found for the given ID", async () => {
      const userId = 3;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);
      mockPrismaCtx.prisma.user.update.mock;

      await expect(service.updateUsernameById(userId, "NewUsername")).rejects.toThrow(AccountNotFoundError);
    });

    it("should throw AccountDeactivatedError if the user's account is not active", async () => {
      const inactiveUserId = mockUsers[0].id;
      const inactiveUser = {...mockUsers[0], active: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(inactiveUser);

      await expect(service.updateUsernameById(inactiveUserId, "NewUsername")).rejects.toThrow(AccountDeactivatedError);
    });

    it("should throw AccountNotEnabledError if the user's account is not enabled", async () => {
      const notEnabledUserId = mockUsers[0].id;
      const notEnabledUser = {...mockUsers[0], enabled: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(notEnabledUser);

      await expect(service.updateUsernameById(notEnabledUserId, "NewUsername")).rejects.toThrow(AccountNotEnabledError);
    });
  });

  describe("UserService updateEmailById", () => {
    const newEmail = "new.email@test.test";

    it("should successfully update the e-mail of an existing user", async () => {
      const userId = 1;
      const updatedUser = {...mockUsers[0], email: newEmail};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(mockUsers[0]);
      mockPrismaCtx.prisma.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateEmailById(userId, newEmail);

      expect(result).toBeInstanceOf(UserResponsePrivateDto);
      expect(result.email).toEqual(newEmail);
      expect(mockPrismaCtx.prisma.user.update).toHaveBeenCalledWith({
        where: {id: userId},
        data: {email: newEmail}
      });
    });

    it("should throw AccountNotFoundError when no user is found for the given ID", async () => {
      const userId = 3;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.updateEmailById(userId, newEmail)).rejects.toThrow(AccountNotFoundError);
    });

    it("should throw AccountDeactivatedError if the user's account is not active", async () => {
      const inactiveUserId = mockUsers[0].id;
      const inactiveUser = {...mockUsers[0], active: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(inactiveUser);

      await expect(service.updateEmailById(inactiveUserId, newEmail)).rejects.toThrow(AccountDeactivatedError);
    });

    it("should throw AccountNotEnabledError if the user's account is not enabled", async () => {
      const notEnabledUserId = mockUsers[0].id;
      const notEnabledUser = {...mockUsers[0], enabled: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(notEnabledUser);

      await expect(service.updateEmailById(notEnabledUserId, newEmail)).rejects.toThrow(AccountNotEnabledError);
    });
  });

  describe("UserService updatePasswordById", () => {
    const newPassword = "newPassword";
    const newHashedPassword = "newHashedPassword";

    it("should successfully update the user's password", async () => {
      const userId = 1;
      mockPasswordEncoder.hash.mockResolvedValue(newHashedPassword);
      const updatedUser = {...mockUsers[0], password: newHashedPassword};

      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(mockUsers[0]);
      mockPrismaCtx.prisma.user.update.mockResolvedValue(updatedUser);

      const result = await service.updatePasswordById(userId, newPassword);

      expect(result).toBeInstanceOf(UserResponsePrivateDto);
      expect(mockPasswordEncoder.hash).toHaveBeenCalledWith(newPassword);
      expect(mockPrismaCtx.prisma.user.update).toHaveBeenCalledWith({
        where: {id: userId},
        data: {password: newHashedPassword}
      });
    });

    it("should throw AccountNotFoundError when no user is found for the given ID", async () => {
      const userId = 3;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.updatePasswordById(userId, newPassword)).rejects.toThrow(AccountNotFoundError);
    });

    it("should throw AccountDeactivatedError if the user's account is not active", async () => {
      const inactiveUserId = mockUsers[0].id;
      const inactiveUser = {...mockUsers[0], active: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(inactiveUser);

      await expect(service.updatePasswordById(inactiveUserId, newPassword)).rejects.toThrow(AccountDeactivatedError);
    });

    it("should throw AccountNotEnabledError if the user's account is not enabled", async () => {
      const notEnabledUserId = mockUsers[0].id;
      const notEnabledUser = {...mockUsers[0], enabled: false};
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(notEnabledUser);

      await expect(service.updatePasswordById(notEnabledUserId, newPassword)).rejects.toThrow(AccountNotEnabledError);
    });
  });

  describe("UserService updateIsActive", () => {
    it("should successfully update the user's active status", async () => {
      const userId = 1;
      const newActiveStatus = false;
      const updatedUser = {...mockUsers[0], active: newActiveStatus};

      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(mockUsers[0]);
      mockPrismaCtx.prisma.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateIsActive(userId, newActiveStatus);

      expect(result).toBeInstanceOf(UserResponsePrivateDto);
      expect(result.active).toEqual(newActiveStatus);
      expect(mockPrismaCtx.prisma.user.update).toHaveBeenCalledWith({
        where: {id: userId},
        data: {active: newActiveStatus}
      });
    });

    it("should throw AccountNotFoundError when no user is found for the given ID", async () => {
      const userId = 3;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.updateIsActive(userId, true)).rejects.toThrow(AccountNotFoundError);
    });
  });

  describe("UserService updateIsEnabled", () => {
    it("should successfully update the user's enabled status", async () => {
      const userId = 1;
      const newEnabledStatus = false;
      const updatedUser = {...mockUsers[0], active: newEnabledStatus};

      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(mockUsers[0]);
      mockPrismaCtx.prisma.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateIsEnabled(userId, newEnabledStatus);

      expect(result).toBeInstanceOf(UserResponsePrivateDto);
      expect(result.active).toEqual(newEnabledStatus);
      expect(mockPrismaCtx.prisma.user.update).toHaveBeenCalledWith({
        where: {id: userId},
        data: {enabled: newEnabledStatus}
      });
    });

    it("should throw AccountNotFoundError when no user is found for the given ID", async () => {
      const userId = 3;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.updateIsEnabled(userId, true)).rejects.toThrow(AccountNotFoundError);
    });
  });

  describe("UserService deleteById", () => {
    it("should successfully delete a user by ID", async () => {
      const userId = mockUsers[0].id;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(mockUsers[0]);
      mockPrismaCtx.prisma.user.delete.mockResolvedValue(mockUsers[0]);

      await expect(service.deleteById(userId)).resolves.not.toThrow();

      expect(mockPrismaCtx.prisma.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it("should throw AccountNotFoundError when no user is found for the given ID", async () => {
      const userId = 3;
      mockPrismaCtx.prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.deleteById(userId)).rejects.toThrow(AccountNotFoundError);

      expect(mockPrismaCtx.prisma.user.delete).not.toHaveBeenCalled();
    });
  });
});
