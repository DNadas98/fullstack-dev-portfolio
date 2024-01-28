import {Test, TestingModule} from "@nestjs/testing";
import {DatabaseService} from "./database.service";

describe("DatabaseService", () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService]
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should connect to the database", async () => {
    await expect(service.$connect()).resolves.not.toThrow();
  });

  it("should disconnect from the database", async () => {
    await service.$connect();
    await expect(service.$disconnect()).resolves.not.toThrow();
  });
});
