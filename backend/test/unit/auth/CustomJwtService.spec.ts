import { Test, TestingModule } from "@nestjs/testing";
import { CustomJwtService } from "../../../src/auth/service/CustomJwtService";
import { JwtService } from "@nestjs/jwt";
import { JwtPayloadDto } from "../../../src/auth/dto/JwtPayloadDto";
import { ConfigService } from "@nestjs/config";
import { JwtExpiredError } from "../../../src/auth/error/JwtExpiredError";

describe("CustomJwtServiceService", () => {
  let service: CustomJwtService;

  const mockConfigService = { get: jest.fn() };
  let testBearerTokenExpiration = 10 * 60 * 1000; // 10min
  let testRefreshTokenExpiration = 10 * 60 * 60 * 1000; // 10h

  beforeEach(async () => {
    mockConfigService.get.mockImplementation((key: string) => {
      switch (key) {
        case "PORTFOLIO_BEARER_TOKEN_SECRET":
          return "test_bearer_secret";
        case "PORTFOLIO_BEARER_TOKEN_EXPIRES_IN":
          return testBearerTokenExpiration;
        case "PORTFOLIO_REFRESH_TOKEN_SECRET":
          return "test_refresh_secret";
        case "PORTFOLIO_REFRESH_TOKEN_EXPIRES_IN":
          return testRefreshTokenExpiration;
        default:
          return null;
      }
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ConfigService,
          useValue: mockConfigService
        },
        CustomJwtService,
        JwtService
      ]
    }).compile();

    service = module.get<CustomJwtService>(CustomJwtService);
  });

  afterEach(() => {
    testBearerTokenExpiration = 10 * 60 * 1000;
    testRefreshTokenExpiration = 10 * 60 * 1000;
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

  it("should verify a valid bearer token", async () => {
    const payload = new JwtPayloadDto("test.test@test.test");
    const token = await service.signBearerToken(payload);
    const verifiedPayload = await service.verifyBearerToken(token);
    expect(verifiedPayload.email).toEqual(payload.email);
  });

  it("should throw an error for invalid bearer token", async () => {
    const token = "invalid token";
    await expect(service.verifyBearerToken(token)).rejects.toThrow(Error);
  });

  it("should throw JwtExpiredError for expired bearer token", async () => {
    const payload = new JwtPayloadDto("test.test@test.test");
    testBearerTokenExpiration = 0;
    const token = await service.signBearerToken(payload);
    await expect(service.verifyBearerToken(token)).rejects.toThrow(
      JwtExpiredError
    );
  });

  it("should verify a valid refresh token", async () => {
    const payload = new JwtPayloadDto("test.test@test.test");
    const token = await service.signRefreshToken(payload);
    const verifiedPayload = await service.verifyRefreshToken(token);
    expect(verifiedPayload.email).toEqual(payload.email);
  });

  it("should sign a refresh token", async () => {
    const payload = new JwtPayloadDto("test.test@test.test");
    const token = await service.signRefreshToken(payload);
    expect(token).toBeDefined();
    expect(token).toBeTruthy();
  });

  it("should throw an error for invalid refresh token", async () => {
    const token = "invalid token";
    await expect(service.verifyRefreshToken(token)).rejects.toThrow(Error);
  });

  it("should throw JwtExpiredError for expired refresh token", async () => {
    const payload = new JwtPayloadDto("test.test@test.test");
    testRefreshTokenExpiration = 0;
    const token = await service.signRefreshToken(payload);
    await expect(service.verifyRefreshToken(token)).rejects.toThrow(
      JwtExpiredError
    );
  });
});
