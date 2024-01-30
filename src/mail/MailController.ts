import { Body, Controller, Post } from "@nestjs/common";
import { MailOptionsDto } from "./dto/MailOptionsDto";
import { MailService } from "./service/MailService";

import { DataResponseDto } from "../common/dto/DataResponseDto";

@Controller("/api/v1/mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("test")
  async sendTestMail(@Body() mailOptions: MailOptionsDto) {
    const sentMailOptions = await this.mailService.sendMail(mailOptions);
    return new DataResponseDto(sentMailOptions);
  }
}
