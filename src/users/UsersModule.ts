import {Module} from "@nestjs/common";
import {UserService} from "./service/UserService";
import {DatabaseModule} from "../database/database.module";
import {UserController} from "./UserController";

@Module({
  imports: [DatabaseModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule {
}
