import { Test, TestingModule } from "@nestjs/testing";
import { createMockContext, MockContext } from "../database/mock/context";
import { StoredGithubUserResponseDto } from "../../../src/projects/dto/StoredGithubUserResponseDto";
import { DatabaseService } from "../../../src/database/service/DatabaseService";
import { DtoConverterService } from "../../../src/common/converter/service/DtoConverterService";
import { StoredGithubUserNotFoundError } from "../../../src/projects/error/StoredGithubUserNotFoundError";
import { StoredGithubUserCreateRequestDto } from "../../../src/projects/dto/StoredGithubUserCreateRequestDto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { UniqueConstraintError } from "../../../src/common/error/UniqueConstraintError";
import { StoredGithubUserUpdateRequestDto } from "../../../src/projects/dto/StoredGithubUserUpdateRequestDto";
import { StoredGithubUserService } from "../../../src/projects/service/StoredGithubUserService";

describe("GithubUserService", () => {
  let mockPrismaCtx: MockContext;

  let service: StoredGithubUserService;

  const mockGithubUsers = [
    { id: 1, githubUsername: "testGithubUser1" },
    { id: 2, githubUsername: "testGithubUser2" }
  ];

  beforeEach(async () => {
    mockPrismaCtx = createMockContext();
    // Mock the transaction to behave just like the normal PrismaClient mock
    mockPrismaCtx.prisma.$transaction.mockImplementation(async (tx) => {
      return tx(mockPrismaCtx.prisma);
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoredGithubUserService,
        DtoConverterService,
        { provide: DatabaseService, useValue: mockPrismaCtx.prisma }
      ]
    }).compile();

    service = module.get<StoredGithubUserService>(StoredGithubUserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("GithubUserService findAll", () => {
    it("should return an array of GithubUserResponseDto objects when users are found", async () => {
      mockPrismaCtx.prisma.githubUser.findMany.mockResolvedValue(
        mockGithubUsers
      );
      const expectedOutput: StoredGithubUserResponseDto[] = mockGithubUsers;

      const result: StoredGithubUserResponseDto[] = await service.findAll();

      expect(result.length).toEqual(2);
      expect(result[0]).toBeInstanceOf(StoredGithubUserResponseDto);
      expect(result[1]).toBeInstanceOf(StoredGithubUserResponseDto);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("GithubUserService findAll", () => {
    it("should return an array of GithubUserResponseDto objects when GithubUsers are found", async () => {
      mockPrismaCtx.prisma.githubUser.findMany.mockResolvedValue(
        mockGithubUsers
      );
      const expectedOutput: StoredGithubUserResponseDto[] = mockGithubUsers;

      const result: StoredGithubUserResponseDto[] = await service.findAll();

      expect(result.length).toEqual(2);
      expect(result[0]).toBeInstanceOf(StoredGithubUserResponseDto);
      expect(result[1]).toBeInstanceOf(StoredGithubUserResponseDto);
      expect(result).toEqual(expectedOutput);
    });

    it("should return an empty array when no GithubUsers are found", async () => {
      mockPrismaCtx.prisma.githubUser.findMany.mockResolvedValue([]);
      const expectedOutput = [];

      const result: StoredGithubUserResponseDto[] = await service.findAll();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(0);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("GithubUserService findById", () => {
    it("should return a GithubUserResponseDto object when GithubUser is found", async () => {
      const userId = mockGithubUsers[0].id;
      mockPrismaCtx.prisma.githubUser.findUnique.mockResolvedValue(
        mockGithubUsers[0]
      );

      const result = await service.findById(userId);

      expect(result).toBeInstanceOf(StoredGithubUserResponseDto);
      expect(result.id).toEqual(userId);
      expect(mockPrismaCtx.prisma.githubUser.findUnique).toHaveBeenCalledWith({
        where: { id: userId }
      });
    });

    it("should throw GithubUserNotFoundError when GithubUser is not found", async () => {
      const githubUserId = mockGithubUsers[0].id;
      mockPrismaCtx.prisma.githubUser.findUnique.mockResolvedValue(null);

      await expect(service.findById(githubUserId)).rejects.toThrow(
        StoredGithubUserNotFoundError
      );
    });
  });

  describe("GithubUserService create", () => {
    const createGithubUserDto = new StoredGithubUserCreateRequestDto(
      mockGithubUsers[0].githubUsername
    );

    it("should successfully create a new GithubUser and return a GithubUserResponseDto", async () => {
      mockPrismaCtx.prisma.githubUser.create.mockResolvedValue(
        mockGithubUsers[0]
      );

      const result = await service.create(createGithubUserDto);

      expect(result).toBeInstanceOf(StoredGithubUserResponseDto);
      expect(result).toEqual(mockGithubUsers[0]);
    });

    it("should throw UniqueConstraintError when a GithubUser with the same name already exists", async () => {
      mockPrismaCtx.prisma.githubUser.create.mockRejectedValue(
        new PrismaClientKnownRequestError("", {
          code: "P2002",
          clientVersion: "1"
        })
      );
      await expect(service.create(createGithubUserDto)).rejects.toThrow(
        UniqueConstraintError
      );
    });
  });

  describe("GithubUserService updateById", () => {
    let updateGithubUserDto: StoredGithubUserUpdateRequestDto;

    beforeEach(() => {
      updateGithubUserDto = new StoredGithubUserUpdateRequestDto(
        "TestUserName"
      );
    });

    it("should successfully update a GithubUser and return the updated GithubUserResponseDto", async () => {
      const updatedGithubUser = {
        ...mockGithubUsers[0],
        githubUsername: updateGithubUserDto.githubUsername as string
      };

      mockPrismaCtx.prisma.githubUser.update.mockResolvedValue(
        updatedGithubUser
      );

      const result = await service.updateById(
        mockGithubUsers[0].id,
        updateGithubUserDto
      );

      expect(result).toBeInstanceOf(StoredGithubUserResponseDto);
      expect(result.githubUsername).toEqual(updateGithubUserDto.githubUsername);
      // Validate other updated fields as necessary
      expect(mockPrismaCtx.prisma.githubUser.update).toHaveBeenCalledWith({
        where: { id: mockGithubUsers[0].id },
        data: expect.any(Object)
      });
      expect(result.githubUsername).toEqual(updateGithubUserDto.githubUsername);
    });

    it("should throw GithubUserNotFoundError when trying to update a non-existing GithubUser", async () => {
      mockPrismaCtx.prisma.githubUser.update.mockRejectedValue(
        new PrismaClientKnownRequestError("", {
          code: "P2025",
          clientVersion: "1"
        })
      );

      await expect(
        service.updateById(111, updateGithubUserDto)
      ).rejects.toThrow(StoredGithubUserNotFoundError);
    });

    it("should throw UniqueConstraintError when a GithubUser with the updated name already exists", async () => {
      mockPrismaCtx.prisma.githubUser.update.mockRejectedValue(
        new PrismaClientKnownRequestError("", {
          code: "P2002",
          clientVersion: "1"
        })
      );

      await expect(
        service.updateById(mockGithubUsers[0].id, updateGithubUserDto)
      ).rejects.toThrow(UniqueConstraintError);
    });

    it("should throw GithubUserNotFoundError when the owner with the provided id does not exist", async () => {
      mockPrismaCtx.prisma.githubUser.update.mockRejectedValue(
        new PrismaClientKnownRequestError("", {
          code: "P2025",
          clientVersion: "1",
          meta: { cause: "test123 GithubUser test123" }
        })
      );

      await expect(
        service.updateById(mockGithubUsers[0].id, updateGithubUserDto)
      ).rejects.toThrow(StoredGithubUserNotFoundError);
    });

    it(
      "should throw GithubUserNotFoundError when the GithubUser with the provided id does" +
        " not exist",
      async () => {
        mockPrismaCtx.prisma.githubUser.update.mockRejectedValue(
          new PrismaClientKnownRequestError("", {
            code: "P2025",
            clientVersion: "1",
            meta: { cause: "test123 test123" }
          })
        );

        await expect(
          service.updateById(mockGithubUsers[0].id, updateGithubUserDto)
        ).rejects.toThrow(StoredGithubUserNotFoundError);
      }
    );
  });

  describe("GithubUserService deleteById", () => {
    it("should successfully delete a GithubUser and return the deleted GithubUserResponseDto", async () => {
      const githubUserIdToDelete = mockGithubUsers[0].id;
      mockPrismaCtx.prisma.githubUser.delete.mockResolvedValue(
        mockGithubUsers[0]
      );

      await expect(service.deleteById(githubUserIdToDelete)).resolves.toBe(
        undefined
      );

      expect(mockPrismaCtx.prisma.githubUser.delete).toHaveBeenCalledWith({
        where: { id: githubUserIdToDelete }
      });
    });

    it("should throw GithubUserNotFoundError when trying to delete a non-existing GithubUser", async () => {
      const githubUserIdToDelete = 111;
      mockPrismaCtx.prisma.githubUser.delete.mockRejectedValue(
        new PrismaClientKnownRequestError("", {
          code: "P2025",
          clientVersion: "1"
        })
      );

      await expect(service.deleteById(githubUserIdToDelete)).rejects.toThrow(
        StoredGithubUserNotFoundError
      );
    });
  });
});
