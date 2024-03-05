import {Module} from "@nestjs/common";
import {MailService} from "./service/MailService";
import {ConfigModule} from "@nestjs/config";
import {MailController} from "./MailController";
import {ConverterModule} from "../common/converter/ConverterModule";

@Module({
  imports: [ConfigModule, ConverterModule],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule {
}
