import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {UsersModule} from "./users/UsersModule";
import {AuthModule} from "./auth/AuthModule";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, AuthModule, UsersModule]
})
export class AppModule {
}
