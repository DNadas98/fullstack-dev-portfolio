import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createTransport, Transporter } from "nodemailer";
import { TransporterCreationError } from "../error/TransporterCreationError";
import { MailOptionsDto } from "../dto/MailOptionsDto";
import Mail from "nodemailer/lib/mailer";
import { MailSendingError } from "../error/MailSendingError";
import { ContactFormRequestDto } from "../dto/ContactFormRequestDto";
import { DtoConverterService } from "../../common/converter/service/DtoConverterService";

@Injectable()
export class MailService {
  private readonly transporter: Transporter;
  private readonly configService: ConfigService;
  private readonly dtoConverter: DtoConverterService;

  constructor(configService: ConfigService, dtoConverter: DtoConverterService) {
    this.configService = configService;
    this.transporter = this.initTransporter();
    this.dtoConverter = dtoConverter;
  }

  /**
   * Loads ENVs from {ConfigService} <br>
   * Initializes the Nodemailer {Transporter}
   * @return The initialized {Transporter}
   * @throws TransporterCreationError
   */
  private initTransporter(): Transporter {
    try {
      return createTransport({
        host: this.configService.get("PORTFOLIO_SMTP_SERVER_URI"),
        port: this.configService.get("PORTFOLIO_SMTP_SERVER_PORT"),
        secure: true,
        auth: {
          user: this.configService.get("PORTFOLIO_SMTP_EMAIL"),
          pass: this.configService.get("PORTFOLIO_SMTP_PASSWORD")
        },
        tls: {
          rejectUnauthorized: true
        }
      });
    } catch (e) {
      throw new TransporterCreationError(e);
    }
  }

  /**
   * @param mailOptions - {MailOptionsDto}
   * @return The received {MailOptionsDto} if successful
   * @throws {MailSendingError}
   */
  async sendMail(mailOptions: MailOptionsDto): Promise<MailOptionsDto> {
    const options: Mail.Options = {
      from: this.configService.get("PORTFOLIO_SMTP_EMAIL"),
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo
    };

    const formattedContent: string = `From: ${mailOptions.name}, ${mailOptions.replyTo}${
      mailOptions.isHtml ? "<br/>" : "\n"
    }${mailOptions.content}`;

    mailOptions.isHtml
      ? (options.html = formattedContent)
      : (options.text = formattedContent);

    try {
      await this.transporter.sendMail(options);
      return mailOptions;
    } catch (e) {
      throw new MailSendingError();
    }
  }

  async sendContactFormMail(contactFormRequestDto: ContactFormRequestDto) {
    const contactEmail = this.configService.get("PORTFOLIO_CONTACT_EMAIL");
    try {
      const options = this.dtoConverter.toMailOptionsDto(
        contactFormRequestDto,
        contactEmail
      );
      return await this.sendMail(options);
    } catch (e) {
      throw new MailSendingError();
    }
  }
}
