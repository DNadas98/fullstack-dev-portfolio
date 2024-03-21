import { Test, TestingModule } from "@nestjs/testing";
import { ForwardService } from "../../../src/forward/service/ForwardService";
import { ConfigService } from "@nestjs/config";

describe("ForwardService", () => {
  let service: ForwardService;
  const mockConfigService = { get: jest.fn() };

  beforeEach(async () => {
    mockConfigService.get.mockImplementation((key: string) => {
      switch (key) {
        case "PORTFOLIO_GITHUB_API_BASE_URL":
          return "test_base_url";
        case "PORTFOLIO_GITHUB_API_TOKEN":
          return "test_api_token";
        default:
          return null;
      }
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ForwardService,
        { provide: ConfigService, useValue: mockConfigService }
      ]
    }).compile();

    service = module.get<ForwardService>(ForwardService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
