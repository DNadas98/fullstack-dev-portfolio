import { Test, TestingModule } from "@nestjs/testing";
import { createMockContext, MockContext } from "../database/mock/context";
import { DatabaseService } from "../../../src/database/service/DatabaseService";
import { DtoConverterService } from "../../../src/common/converter/service/DtoConverterService";
import { GithubCodeSnippetCreateRequestDto } from "../../../src/projects/dto/GithubCodeSnippetCreateRequestDto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { GithubCodeSnippetUpdateRequestDto } from "../../../src/projects/dto/GithubCodeSnippetUpdateRequestDto";
import { GithubCodeSnippetService } from "../../../src/projects/service/GithubCodeSnippetService";
import { GithubCodeSnippetResponseDto } from "../../../src/projects/dto/GithubCodeSnippetResponseDto";
import { CodeSnippetNotFoundError } from "../../../src/projects/error/CodeSnippetNotFoundError";
import { ProjectNotFoundError } from "../../../src/projects/error/ProjectNotFoundError";

describe("GithubCodeSnippetService", () => {
  let mockPrismaCtx: MockContext;

  let service: GithubCodeSnippetService;

  const mockGithubCodeSnippets = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      displayName: "TestDisplayName1",
      filePath: "test/test.java",
      format: "java",
      startLine: 1,
      endLine: 2,
      description: "Test description 1",
      githubRepositoryId: 1
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      displayName: "TestDisplayName2",
      filePath: "test/test.js",
      format: "javascript",
      startLine: 2,
      endLine: 3,
      description: "Test description 2",
      githubRepositoryId: 2
    }
  ];

  beforeEach(async () => {
    mockPrismaCtx = createMockContext();
    // Mock the transaction to behave just like the normal PrismaClient mock
    mockPrismaCtx.prisma.$transaction.mockImplementation(async (tx) => {
      return tx(mockPrismaCtx.prisma);
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GithubCodeSnippetService,
        DtoConverterService,
        { provide: DatabaseService, useValue: mockPrismaCtx.prisma }
      ]
    }).compile();

    service = module.get<GithubCodeSnippetService>(GithubCodeSnippetService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("GithubCodeSnippetService findAll", () => {
    it(
      "should return an array of GithubCodeSnippetResponseDto objects when code" +
        " snippets are found",
      async () => {
        mockPrismaCtx.prisma.githubCodeSnippet.findMany.mockResolvedValue(
          mockGithubCodeSnippets
        );
        const expectedOutput: GithubCodeSnippetResponseDto[] =
          mockGithubCodeSnippets;

        const result = await service.findAll();

        expect(result.length).toEqual(2);
        expect(result[0]).toBeInstanceOf(GithubCodeSnippetResponseDto);
        expect(result[1]).toBeInstanceOf(GithubCodeSnippetResponseDto);
        expect(result).toEqual(expectedOutput);
      }
    );

    it("should return an empty array when no code snippets are found", async () => {
      mockPrismaCtx.prisma.githubCodeSnippet.findMany.mockResolvedValue([]);
      const expectedOutput = [];

      const result = await service.findAll();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(0);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("GithubCodeSnippetService findById", () => {
    it("should return a GithubCodeSnippetResponseDto object when code snippet is found", async () => {
      const codeSnippetId = mockGithubCodeSnippets[0].id;
      mockPrismaCtx.prisma.githubCodeSnippet.findUnique.mockResolvedValue(
        mockGithubCodeSnippets[0]
      );

      const result = await service.findById(codeSnippetId);

      expect(result).toBeInstanceOf(GithubCodeSnippetResponseDto);
      expect(result.id).toEqual(codeSnippetId);
      expect(
        mockPrismaCtx.prisma.githubCodeSnippet.findUnique
      ).toHaveBeenCalledWith({
        where: { id: codeSnippetId }
      });
    });

    it("should throw GithubCodeSnippetNotFoundError when GithubCodeSnippet is not found", async () => {
      const codeSnippetId = mockGithubCodeSnippets[0].id;
      mockPrismaCtx.prisma.githubCodeSnippet.findUnique.mockResolvedValue(null);

      await expect(service.findById(codeSnippetId)).rejects.toThrow(
        CodeSnippetNotFoundError
      );
    });
  });

  describe("GithubCodeSnippetService create", () => {
    const createGithubCodeSnippetDto = new GithubCodeSnippetCreateRequestDto(
      mockGithubCodeSnippets[0].displayName,
      mockGithubCodeSnippets[0].filePath,
      mockGithubCodeSnippets[0].format,
      mockGithubCodeSnippets[0].startLine,
      mockGithubCodeSnippets[0].endLine,
      mockGithubCodeSnippets[0].description,
      mockGithubCodeSnippets[0].githubRepositoryId
    );

    it(
      "should successfully create a new GithubCodeSnippet and return a" +
        " GithubCodeSnippetResponseDto",
      async () => {
        mockPrismaCtx.prisma.githubCodeSnippet.create.mockResolvedValue(
          mockGithubCodeSnippets[0]
        );

        const result = await service.create(createGithubCodeSnippetDto);

        expect(result).toBeInstanceOf(GithubCodeSnippetResponseDto);
        expect(result).toEqual(mockGithubCodeSnippets[0]);
      }
    );
  });

  describe("GithubCodeSnippetService updateById", () => {
    let updateGithubCodeSnippetDto: GithubCodeSnippetUpdateRequestDto;

    beforeEach(() => {
      updateGithubCodeSnippetDto = new GithubCodeSnippetUpdateRequestDto(
        "UpdatedDisplayName"
      );
    });

    it("should successfully update a GithubCodeSnippet and return the updated GithubCodeSnippetResponseDto", async () => {
      const updatedGithubCodeSnippet = {
        ...mockGithubCodeSnippets[0],
        displayName: updateGithubCodeSnippetDto.displayName as string
      };

      mockPrismaCtx.prisma.githubCodeSnippet.findUnique.mockResolvedValue(
        mockGithubCodeSnippets[0]
      );
      mockPrismaCtx.prisma.githubCodeSnippet.update.mockResolvedValue(
        updatedGithubCodeSnippet
      );

      const result = await service.updateById(
        mockGithubCodeSnippets[0].id,
        updateGithubCodeSnippetDto
      );

      expect(result).toBeInstanceOf(GithubCodeSnippetResponseDto);
      expect(result.displayName).toEqual(
        updateGithubCodeSnippetDto.displayName
      );
      // Validate other updated fields as necessary
      expect(
        mockPrismaCtx.prisma.githubCodeSnippet.update
      ).toHaveBeenCalledWith({
        where: { id: mockGithubCodeSnippets[0].id },
        data: expect.any(Object)
      });
      expect(result.displayName).toEqual(
        updateGithubCodeSnippetDto.displayName
      );
    });

    it("should throw GithubCodeSnippetNotFoundError when trying to update a non-existing GithubCodeSnippet", async () => {
      mockPrismaCtx.prisma.githubCodeSnippet.findUnique.mockResolvedValue(null);

      await expect(
        service.updateById(111, updateGithubCodeSnippetDto)
      ).rejects.toThrow(CodeSnippetNotFoundError);
    });

    it(
      "should throw ProjectNotFoundError when the project with the provided id does" +
        " not exist",
      async () => {
        mockPrismaCtx.prisma.githubCodeSnippet.findUnique.mockResolvedValue(
          mockGithubCodeSnippets[0]
        );
        mockPrismaCtx.prisma.githubCodeSnippet.update.mockRejectedValue(
          new PrismaClientKnownRequestError("", {
            code: "P2025",
            clientVersion: "1",
            meta: { cause: "test123 GithubRepository test123" }
          })
        );

        await expect(
          service.updateById(
            mockGithubCodeSnippets[0].id,
            updateGithubCodeSnippetDto
          )
        ).rejects.toThrow(ProjectNotFoundError);
      }
    );
  });

  describe("GithubCodeSnippetService deleteById", () => {
    it("should successfully delete a GithubCodeSnippet and return the deleted GithubCodeSnippetResponseDto", async () => {
      const githubCodeSnippetToDelete = mockGithubCodeSnippets[0].id;
      mockPrismaCtx.prisma.githubCodeSnippet.delete.mockResolvedValue(
        mockGithubCodeSnippets[0]
      );

      await expect(service.deleteById(githubCodeSnippetToDelete)).resolves.toBe(
        undefined
      );

      expect(
        mockPrismaCtx.prisma.githubCodeSnippet.delete
      ).toHaveBeenCalledWith({
        where: { id: githubCodeSnippetToDelete }
      });
    });

    it("should throw GithubCodeSnippetNotFoundError when trying to delete a non-existing GithubCodeSnippet", async () => {
      const codeSnippetIdToDelete = 111;
      mockPrismaCtx.prisma.githubCodeSnippet.delete.mockRejectedValue(
        new PrismaClientKnownRequestError("", {
          code: "P2025",
          clientVersion: "1"
        })
      );

      await expect(service.deleteById(codeSnippetIdToDelete)).rejects.toThrow(
        CodeSnippetNotFoundError
      );
    });
  });
});
