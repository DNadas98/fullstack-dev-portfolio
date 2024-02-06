import {Test, TestingModule} from "@nestjs/testing";
import {ProjectService} from "../../../src/projects/service/ProjectService";
import {createMockContext, MockContext} from "../database/mock/context";
import {ProjectResponseDto} from "../../../src/projects/dto/ProjectResponseDto";
import {DatabaseService} from "../../../src/database/service/DatabaseService";
import {
  DtoConverterService
} from "../../../src/common/converter/service/DtoConverterService";
import {ProjectNotFoundError} from "../../../src/projects/error/ProjectNotFoundError";
import {ProjectCreateRequestDto} from "../../../src/projects/dto/ProjectCreateRequestDto";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime/library";
import {UniqueConstraintError} from "../../../src/common/error/UniqueConstraintError";
import {
  GithubUserNotFoundError
} from "../../../src/projects/error/GithubUserNotFoundError";
import {ProjectUpdateRequestDto} from "../../../src/projects/dto/ProjectUpdateRequestDto";

describe("ProjectService", () => {
  let mockPrismaCtx: MockContext;

  let service: ProjectService;

  const mockContributors = [
    {id: 1, githubUsername: "testGithubUser1", userId: 1},
    {id: 2, githubUsername: "testGithubUser2", userId: 2}
  ];

  const mockCodeSnippets = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      displayName: "testCodeSnippet1",
      filePath: "testCodeSnippetPath1",
      format: "java",
      startLine: 1,
      endLine: 10,
      description: "Test code snippet description 1",
      githubRepositoryId: 1
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      displayName: "testCodeSnippet2",
      filePath: "testCodeSnippetPath2",
      format: "javascript",
      startLine: 2,
      endLine: 9,
      description: "Test code snippet description 2",
      githubRepositoryId: 2
    }
  ];

  const mockImages = [
    {id: 1, src: "testImageSrc1", githubRepositoryId: 1},
    {id: 2, src: "testImageSrc2", githubRepositoryId: 2}
  ];


  const mockProjects = [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 1,
      contributors: [mockContributors[0]],
      name: "testProject1",
      branchName: "test-branch-name-1",
      codeSnippets: [mockCodeSnippets[0]],
      images: [mockImages[0]],
      readmePath: "README.md",
      readmeFormat: "markdown",
      licensePath: "LICENSE.txt",
      licenseFormat: "text",
      deploymentUrl: "http://test.test"
    },
    {
      id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: 2,
      contributors: [mockContributors[1]],
      name: "testProject2",
      branchName: "test-branch-name-2",
      codeSnippets: [mockCodeSnippets[1]],
      images: [mockImages[1]],
      readmePath: null,
      readmeFormat: null,
      licensePath: null,
      licenseFormat: null,
      deploymentUrl: null
    }
  ];

  const mockProjectResponseDtos = mockProjects.map(project => ({
    id: project.id,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    ownerId: project.ownerId,
    contributorIds: project.contributors.map(c => c.id),
    name: project.name,
    branchName: project.branchName,
    codeSnippetIds: project.codeSnippets.map(snippet => snippet.id),
    imageIds: project.images.map(image => image.id),
    readmePath: project.readmePath,
    readmeFormat: project.readmeFormat,
    licensePath: project.licensePath,
    licenseFormat: project.licenseFormat,
    deploymentUrl: project.deploymentUrl
  }));

  beforeEach(async () => {
    mockPrismaCtx = createMockContext();
    // Mock the transaction to behave just like the normal PrismaClient mock
    mockPrismaCtx.prisma.$transaction.mockImplementation(async (tx) => {
      return tx(mockPrismaCtx.prisma);
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectService, DtoConverterService,
        {provide: DatabaseService, useValue: mockPrismaCtx.prisma}]
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("ProjectService findAll", () => {
    it("should return an array of ProjectResponseDto objects when projects are found", async () => {
      mockPrismaCtx.prisma.githubRepository.findMany.mockResolvedValue(mockProjects);
      const expectedOutput: ProjectResponseDto[] = mockProjectResponseDtos;

      const result: ProjectResponseDto[] = await service.findAll();

      expect(result.length).toEqual(2);
      expect(result[0]).toBeInstanceOf(ProjectResponseDto);
      expect(result[1]).toBeInstanceOf(ProjectResponseDto);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("ProjectService findAll", () => {
    it("should return an array of ProjectResponseDto objects when projects are found", async () => {
      mockPrismaCtx.prisma.githubRepository.findMany.mockResolvedValue(mockProjects);
      const expectedOutput: ProjectResponseDto[] = mockProjectResponseDtos;

      const result: ProjectResponseDto[] = await service.findAll();

      expect(result.length).toEqual(2);
      expect(result[0]).toBeInstanceOf(ProjectResponseDto);
      expect(result[1]).toBeInstanceOf(ProjectResponseDto);
      expect(result).toEqual(expectedOutput);
    });

    it("should return an empty array when no projects are found", async () => {
      mockPrismaCtx.prisma.githubRepository.findMany.mockResolvedValue([]);
      const expectedOutput = [];

      const result: ProjectResponseDto[] = await service.findAll();

      expect(Array.isArray(result)).toBeTruthy();
      expect(result.length).toEqual(0);
      expect(result).toEqual(expectedOutput);
    });
  });

  describe("ProjectService findById", () => {
    it("should return a ProjectResponseDto object when project is found", async () => {
      const projectId = mockProjects[0].id;
      mockPrismaCtx.prisma.githubRepository.findUnique.mockResolvedValue(mockProjects[0]);

      const result = await service.findById(projectId);

      expect(result).toBeInstanceOf(ProjectResponseDto);
      expect(result.id).toEqual(projectId);
      expect(mockPrismaCtx.prisma.githubRepository.findUnique).toHaveBeenCalledWith({
          where: {id: projectId},
          include: {contributors: true, codeSnippets: true, images: true}
        }
      );
    });

    it("should throw ProjectNotFoundError when project is not found", async () => {
      const projectId = mockProjects[0].id;
      mockPrismaCtx.prisma.githubRepository.findUnique.mockResolvedValue(null);

      await expect(service.findById(projectId)).rejects.toThrow(ProjectNotFoundError);
    });
  });

  describe("ProjectService create", () => {
    const createProjectDto = new ProjectCreateRequestDto(
      mockProjects[0].ownerId, mockProjects[0].name, mockProjects[0].branchName,
      mockProjects[0].readmePath, mockProjects[0].readmeFormat,
      mockProjects[0].licensePath, mockProjects[0].licenseFormat,
      mockProjects[0].deploymentUrl
    );

    it("should successfully create a new project and return a ProjectResponseDto", async () => {
      mockPrismaCtx.prisma.githubRepository.create.mockResolvedValue(mockProjects[0]);

      const result = await service.create(createProjectDto);

      expect(result).toBeInstanceOf(ProjectResponseDto);
      expect(result).toEqual(mockProjectResponseDtos[0]);
    });

    it("should throw UniqueConstraintError when a project with the same name already exists", async () => {
      mockPrismaCtx.prisma.githubRepository.create.mockRejectedValue(new PrismaClientKnownRequestError(
        "", {code: "P2002", clientVersion: "1"}
      ));
      await expect(service.create(createProjectDto)).rejects.toThrow(UniqueConstraintError);
    });

    it("should throw GithubUserNotFoundError when the owner with the provided id does" +
      " not exist", async () => {
      mockPrismaCtx.prisma.githubRepository.create.mockRejectedValue(new PrismaClientKnownRequestError(
        "", {code: "P2003", clientVersion: "1"}
      ));
      await expect(service.create(createProjectDto)).rejects.toThrow(GithubUserNotFoundError);
    });
  });

  describe("ProjectService updateById", () => {
    let updateProjectDto: ProjectUpdateRequestDto;

    beforeEach(() => {
      updateProjectDto = new ProjectUpdateRequestDto(
        mockProjects[0].ownerId, "Updated Project Name", "updated-branch"
      );
    });

    it("should successfully update a project and return the updated ProjectResponseDto", async () => {
      const updatedProject = {
        ...mockProjects[0],
        name: updateProjectDto.name as string,
        branchName: updateProjectDto.branchName as string
      };

      mockPrismaCtx.prisma.githubRepository.update.mockResolvedValue(updatedProject);

      const result = await service.updateById(mockProjects[0].id, updateProjectDto);

      expect(result).toBeInstanceOf(ProjectResponseDto);
      expect(result.name).toEqual(updateProjectDto.name);
      // Validate other updated fields as necessary
      expect(mockPrismaCtx.prisma.githubRepository.update).toHaveBeenCalledWith({
        where: {id: mockProjects[0].id},
        data: expect.any(Object),
        include: {contributors: true, codeSnippets: true, images: true}
      });
      expect(result.name).toEqual(updateProjectDto.name);
      expect(result.branchName).toEqual(updateProjectDto.branchName);
    });

    it("should throw ProjectNotFoundError when trying to update a non-existing project", async () => {
      mockPrismaCtx.prisma.githubRepository.update.mockRejectedValue(
        new PrismaClientKnownRequestError(
          "", {code: "P2025", clientVersion: "1"}
        ));

      await expect(service.updateById(111, updateProjectDto))
        .rejects.toThrow(ProjectNotFoundError);
    });

    it("should throw UniqueConstraintError when a project with the updated name already exists", async () => {
      mockPrismaCtx.prisma.githubRepository.update.mockRejectedValue(
        new PrismaClientKnownRequestError(
          "", {code: "P2002", clientVersion: "1"})
      );

      await expect(service.updateById(mockProjects[0].id, updateProjectDto))
        .rejects.toThrow(UniqueConstraintError);
    });

    it("should throw GithubUserNotFoundError when the owner with the provided id does not exist", async () => {
      mockPrismaCtx.prisma.githubRepository.update.mockRejectedValue(
        new PrismaClientKnownRequestError(
          "", {code: "P2003", clientVersion: "1"})
      );

      await expect(service.updateById(mockProjects[0].id, updateProjectDto))
        .rejects.toThrow(GithubUserNotFoundError);
    });
  });

  describe("ProjectService deleteById", () => {
    it("should successfully delete a project and return the deleted ProjectResponseDto", async () => {
      const projectIdToDelete = mockProjects[0].id;
      mockPrismaCtx.prisma.githubRepository.delete.mockResolvedValue(mockProjects[0]);

      await expect(service.deleteById(projectIdToDelete)).resolves.toBe(undefined);

      expect(mockPrismaCtx.prisma.githubRepository.delete).toHaveBeenCalledWith({
        where: {id: projectIdToDelete}
      });
    });

    it("should throw ProjectNotFoundError when trying to delete a non-existing project", async () => {
      const projectIdToDelete = 111;
      mockPrismaCtx.prisma.githubRepository.delete.mockRejectedValue(
        new PrismaClientKnownRequestError(
          "", {code: "P2025", clientVersion: "1"}
        ));

      await expect(service.deleteById(projectIdToDelete))
        .rejects.toThrow(ProjectNotFoundError);
    });
  });
})
;
