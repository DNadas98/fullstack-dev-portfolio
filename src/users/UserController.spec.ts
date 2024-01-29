import {Test, TestingModule} from "@nestjs/testing";
import {UserController} from "./UserController";
import {UserService} from "./service/UserService";

describe("UsersController", () => {
  let controller: UserController;
  const mockUserService = {
    //TODO:Impl
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{provide: UserService, useValue: mockUserService}]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
