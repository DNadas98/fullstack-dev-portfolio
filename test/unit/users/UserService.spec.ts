import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../../../src/users/service/UserService";
import { DatabaseService } from "../../../src/database/service/DatabaseService";

describe("UsersService", () => {
  let service: UserService;

  const mockDatabaseService = {
    //TODO: impl
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  //TODO: create tests
});
