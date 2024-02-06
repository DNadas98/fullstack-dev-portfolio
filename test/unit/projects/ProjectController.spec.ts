import { Test, TestingModule } from "@nestjs/testing";
import {ProjectController} from "../../../src/projects/controller/ProjectController";
import {ProjectService} from "../../../src/projects/service/ProjectService";

describe("ProjectController", () => {
  let controller: ProjectController;
  const mockProjectService = {
    //TODO:Impl
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        { provide: ProjectService, useValue: mockProjectService },
      ]
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
