import { Test, TestingModule } from "@nestjs/testing";
import {AdminProjectController} from "../../../src/projects/controller/AdminProjectController";
import {ProjectService} from "../../../src/projects/service/ProjectService";

describe("AdminProjectController", () => {
  let controller: AdminProjectController;
  const mockProjectService = {
    //TODO:Impl
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminProjectController],
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
      ]
    }).compile();

    controller = module.get<AdminProjectController>(AdminProjectController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
