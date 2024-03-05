import {Body, Controller, Post} from "@nestjs/common";
import {MailService} from "./service/MailService";
import {DataResponseDto} from "../common/dto/DataResponseDto";
import {Throttle} from "@nestjs/throttler";
import {mailRateLimiterOptions} from "../common/config/rateLimiterOptions";
import {ContactFormRequestDto} from "./dto/ContactFormRequestDto";

@Throttle({default: mailRateLimiterOptions})
@Controller("/api/v1/mail")
export class MailController {
  constructor(private readonly mailService: MailService) {
  }

  @Post("contact")
  async sendContactFormMail(@Body() contactFormRequestDto: ContactFormRequestDto) {
    const sentMailOptions = await this.mailService.sendContactFormMail(contactFormRequestDto);
    return new DataResponseDto(sentMailOptions);
  }
}
