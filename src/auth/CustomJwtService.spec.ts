import {Test, TestingModule} from "@nestjs/testing";
import {CustomJwtService} from "./CustomJwtService";
import {JwtService} from "@nestjs/jwt";
import {JwtPayloadDto} from "./dto/JwtPayloadDto";
import {ConfigService} from "@nestjs/config";

describe("CustomJwtServiceService", () => {
  let service: CustomJwtService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === "PORTFOLIO_BEARER_TOKEN_SECRET") {
        return "test_bearer_secret";
      } else if (key === "PORTFOLIO_BEARER_TOKEN_EXPIRES_IN") {
        return 10 * 60 * 1000;
      } else if (key === "PORTFOLIO_REFRESH_TOKEN_SECRET") {
        return "test_refresh_secret";
      } else if (key === "PORTFOLIO_REFRESH_TOKEN_EXPIRES_IN") {
        return 10 * 60 * 60 * 1000;
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ConfigService, useValue: mockConfigService
      }, CustomJwtService, JwtService]
    }).compile();

    service = module.get<CustomJwtService>(CustomJwtService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should sign a bearer token", async () => {
    const payload = new JwtPayloadDto("test.test@test.test");
    const token = await service.signBearerToken(payload);
    expect(token).toBeDefined();
    expect(token).toBeTruthy();
  });

  it("should verify a bearer token", async () => {
    const payload = new JwtPayloadDto("test.test@test.test");
    const token = await service.signBearerToken(payload);
    const verifiedPayload = await service.verifyBearerToken(token);
    expect(verifiedPayload.email).toEqual(payload.email);
  });

  it("should sign a refresh token", async () => {
    const payload = new JwtPayloadDto("test.test@test.test");
    const token = await service.signRefreshToken(payload);
    expect(token).toBeDefined();
    expect(token).toBeTruthy();
  });

  it("should verify a refresh token", async () => {
    const payload = new JwtPayloadDto("test.test@test.test");
    const token = await service.signRefreshToken(payload);
    const verifiedPayload = await service.verifyRefreshToken(token);
    expect(verifiedPayload.email).toEqual(payload.email);
  });

});
