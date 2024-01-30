import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {createTransport, Transporter} from "nodemailer";
import {TransporterCreationError} from "../error/TransporterCreationError";
import {MailOptionsDto} from "../dto/MailOptionsDto";
import Mail from "nodemailer/lib/mailer";
import {MailSendingError} from "../error/MailSendingError";

@Injectable()
export class MailService {
  private readonly transporter: Transporter;
  private readonly configService: ConfigService;

  constructor(configService: ConfigService) {
    this.configService = configService;
    this.transporter = this.initTransporter();
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
      subject: mailOptions.subject
    };
    mailOptions.isHtml
      ? options.html = mailOptions.content
      : options.text = mailOptions.content;

    try {
      await this.transporter.sendMail(options);
      return mailOptions;
    } catch (e) {
      throw new MailSendingError();
    }
  }
}
