import {Module} from "@nestjs/common";
import {UserService} from "./service/UserService";
import {DatabaseModule} from "../database/database.module";
import {UserController} from "./UserController";
import {CustomJwtModule} from "../auth/CustomJwtModule";

@Module({
  imports: [DatabaseModule, CustomJwtModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UsersModule {
}
