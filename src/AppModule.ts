import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/DatabaseModule";
import {UsersModule} from "./users/UsersModule";
import {AuthModule} from "./auth/AuthModule";
import {ConfigModule} from "@nestjs/config";
import {MailModule} from "./mail/MailModule";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, UsersModule, MailModule]
})
export class AppModule {
}
