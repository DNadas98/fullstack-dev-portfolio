import {Test, TestingModule} from "@nestjs/testing";
import {BcryptPasswordEncoder} from "./BcryptPasswordEncoder";

describe("PasswordEncoderService", () => {
  let service: BcryptPasswordEncoder;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BcryptPasswordEncoder]
    }).compile();

    service = module.get<BcryptPasswordEncoder>(BcryptPasswordEncoder);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should hash a password", async () => {
    const password = "testPassword";
    const hash = await service.hash(password);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
  });

  it("should return true for correct password", async () => {
    const password = "testPassword";
    const hash = await service.hash(password);
    const result = await service.compare(password, hash);
    expect(result).toBe(true);
  });

  it("should return false for incorrect password", async () => {
    const password = "testPassword";
    const wrongPassword = "wrongPassword";
    const hash = await service.hash(password);
    const result = await service.compare(wrongPassword, hash);
    expect(result).toBe(false);
  });
});
