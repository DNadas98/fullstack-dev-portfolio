import { Test, TestingModule } from "@nestjs/testing";
import { UserController } from "../../../src/users/controller/UserController";
import { UserService } from "../../../src/users/service/UserService";
import { IJwtService } from "../../../src/auth/service/IJwtService";

describe("UsersController", () => {
  let controller: UserController;
  const mockUserService = {
    //TODO:Impl
  };

  const mockJwtService = {
    //TODO:Impl
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        { provide: IJwtService, useValue: mockJwtService }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
