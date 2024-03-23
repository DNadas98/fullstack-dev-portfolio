import { Test, TestingModule } from "@nestjs/testing";
import { MailService } from "../../../src/mail/service/MailService";
import { ConfigService } from "@nestjs/config";
import { MailOptionsDto } from "../../../src/mail/dto/MailOptionsDto";
import { MailSendingError } from "../../../src/mail/error/MailSendingError";
import { ContactFormRequestDto } from "../../../src/mail/dto/ContactFormRequestDto";
import { DtoConverterService } from "../../../src/common/converter/service/DtoConverterService";

describe("MailService", () => {
  let service: MailService;

  const mockConfigService = {
    get: jest.fn((key: string) => {
      if (key === "PORTFOLIO_SMTP_SERVER_URI") {
        return "localhost";
      } else if (key === "PORTFOLIO_SMTP_SERVER_PORT") {
        return 465;
      } else if (key === "PORTFOLIO_SMTP_EMAIL") {
        return "nonexistentemail";
      } else if (key === "PORTFOLIO_CONTACT_EMAIL") {
        return "nonexistentemail";
      } else if (key === "PORTFOLIO_SMTP_PASSWORD") {
        return "smtpPassword";
      }
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        MailService,
        DtoConverterService
      ]
    }).compile();

    service = module.get<MailService>(MailService);
  });

  it("should initialize correctly", () => {
    expect(service).toBeDefined();
  });

  describe("MailService sendMail", () => {
    it("should attempt to send e-mail and throw error", async () => {
      await expect(
        service.sendMail(
          new MailOptionsDto(
            "nonexistentemail",
            `Test ${Date.now()} Nodemailer NestJS`,
            `Test 1 ${Date.now()} content`,
            false,
            "test.test@test.test",
            "Test Mail Sender"
          )
        )
      ).rejects.toThrow(MailSendingError);
    });
  });

  describe("MailService sendContactFormMail", () => {
    it("should attempt to send e-mail and throw error", async () => {
      await expect(
        service.sendContactFormMail(
          new ContactFormRequestDto(
            `Test ${Date.now()} Nodemailer NestJS`,
            `Test 1 ${Date.now()} content`,
            false
          )
        )
      ).rejects.toThrow(MailSendingError);
    });
  });
});
