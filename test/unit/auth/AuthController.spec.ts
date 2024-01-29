import {Test, TestingModule} from "@nestjs/testing";
import {AuthController} from "../../../src/auth/AuthController";
import {AuthService} from "../../../src/auth/AuthService";
import {ConfigService} from "@nestjs/config";

describe("AuthController", () => {
  let controller: AuthController;

  const mockAuthService = {
    //TODO: impl
  };

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === "PORTFOLIO_REFRESH_TOKEN_EXPIRES_IN") {
        return 10 * 60 * 60 * 1000;
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController], providers: [{
        provide: AuthService, useValue: mockAuthService
      }, {
        provide: ConfigService, useValue: mockConfigService
      }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
