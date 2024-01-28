import {Module} from "@nestjs/common";
import {DatabaseModule} from "./database/database.module";
import {UsersModule} from "./users/UsersModule";
import {AuthModule} from "./auth/AuthModule";

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule]
})
export class AppModule {
}
