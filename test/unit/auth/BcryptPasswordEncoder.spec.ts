import { Test, TestingModule } from "@nestjs/testing";
import { BcryptPasswordEncoder } from "../../../src/auth/service/BcryptPasswordEncoder";

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

  it("should generate unique hashes for the same password", async () => {
    const password = "testPassword";
    const hash1 = await service.hash(password);
    const hash2 = await service.hash(password);
    expect(hash1).not.toBe(hash2);
  });

  it("should throw errors for invalid password types", async () => {
    await expect(service.hash(null as unknown as string)).rejects.toThrow(
      Error
    );
    await expect(service.hash(undefined as unknown as string)).rejects.toThrow(
      Error
    );
    await expect(service.hash({} as string)).rejects.toThrow(Error);
    await expect(service.hash([] as unknown as string)).rejects.toThrow(Error);
  });
});
