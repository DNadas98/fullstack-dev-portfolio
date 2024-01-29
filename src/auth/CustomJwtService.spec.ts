import {Test, TestingModule} from "@nestjs/testing";
import {CustomJwtService} from "./CustomJwtService";
import {JwtService} from "@nestjs/jwt";

describe("CustomJwtServiceService", () => {
  let service: CustomJwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomJwtService, JwtService]
    }).compile();

    service = module.get<CustomJwtService>(CustomJwtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
