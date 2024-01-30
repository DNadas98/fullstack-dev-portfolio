import {Test, TestingModule} from "@nestjs/testing";
import {MailService} from "../../../src/mail/service/MailService";
import {ConfigService} from "@nestjs/config";
import {MailOptionsDto} from "../../../src/mail/dto/MailOptionsDto";
import {MailSendingError} from "../../../src/mail/error/MailSendingError";

describe("MailService", () => {
  let service: MailService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === "PORTFOLIO_SMTP_SERVER_URI") {
        return "localhost";
      } else if (key === "PORTFOLIO_SMTP_SERVER_PORT") {
        return 465;
      } else if (key === "PORTFOLIO_SMTP_EMAIL") {
        return "smtpEmail";
      } else if (key === "PORTFOLIO_SMTP_PASSWORD") {
        return "smtpPassword";
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{provide: ConfigService, useValue: mockConfigService}, MailService]
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it("should initialize correctly", () => {
    expect(service).toBeDefined();
  });

  it("should attempt to send e-mail and throw error", async () => {
    await expect(service.sendMail(new MailOptionsDto(
      "dani@web-dev-test.hu",
      `Test ${Date.now()} Nodemailer NestJS`,
      `Test 1 ${Date.now()} content`,
      false
    ))).rejects.toThrow(MailSendingError);
  });
});
