import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {ForwardService} from "./service/ForwardService";

@Module({
  imports: [ConfigModule],
  providers: [ForwardService],
  exports: [ForwardService]
})
export class ForwardModule {
}
