import {Module} from "@nestjs/common";
import {MailService} from "./service/MailService";
import {ConfigModule} from "@nestjs/config";
import {MailController} from "./MailController";

@Module({
  imports: [ConfigModule],
  providers: [MailService],
  controllers: [MailController],
  exports: [MailService]
})
export class MailModule {
}
