import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../../../src/users/service/UserService";
import { IJwtService } from "../../../src/auth/service/IJwtService";
import { AdminController } from "../../../src/users/controller/AdminController";

describe("AdminController", () => {
  let controller: AdminController;
  const mockUserService = {
    //TODO:Impl
  };

  const mockJwtService = {
    //TODO:Impl
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: IJwtService, useValue: mockJwtService }
      ]
    }).compile();

    controller = module.get<AdminController>(AdminController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
