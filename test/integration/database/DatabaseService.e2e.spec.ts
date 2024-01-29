import {Test, TestingModule} from "@nestjs/testing";
import {DatabaseService} from "../../../src/database/database.service";
import * as process from "process";

describe("DatabaseService (integration)", () => {
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

  it("should connect to the database if ENV is present", async () => {
    if (process.env.PORTFOLIO_DB_URL) {
      await expect(service.$connect()).resolves.not.toThrow();
    }
  });

  it("should disconnect from the database if ENV is present", async () => {
    if (process.env.PORTFOLIO_DB_URL) {
      await service.$connect();
      await expect(service.$disconnect()).resolves.not.toThrow();
    }
  });
});
