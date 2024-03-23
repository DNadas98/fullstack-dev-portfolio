import { Test, TestingModule } from "@nestjs/testing";
import { AdminProjectController } from "../../../src/projects/controller/AdminProjectController";
import { ProjectService } from "../../../src/projects/service/ProjectService";
import { IJwtService } from "../../../src/auth/service/IJwtService";
import { UserService } from "../../../src/users/service/UserService";

describe("AdminProjectController", () => {
  let controller: AdminProjectController;
  const mockProjectService = {
    //TODO:Impl
  };

  const mockJwtService = {
    //TODO:Impl
  };

  const mockUserService = {
    //TODO:Impl
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminProjectController],
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
        { provide: IJwtService, useValue: mockJwtService },
        { provide: UserService, useValue: mockUserService }
      ]
    }).compile();

    controller = module.get<AdminProjectController>(AdminProjectController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
