import {Module} from "@nestjs/common";
import {UserService} from "./service/UserService";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {
}
