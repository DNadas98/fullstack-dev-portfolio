import { Module } from "@nestjs/common";
import { UserService } from "./service/UserService";
import { DatabaseModule } from "../database/DatabaseModule";
import { UserController } from "./controller/UserController";
import { CustomJwtModule } from "../auth/CustomJwtModule";
import { AdminController } from "./controller/AdminController";

@Module({
  imports: [DatabaseModule, CustomJwtModule],
  providers: [UserService],
  controllers: [UserController, AdminController],
  exports: [UserService]
})
export class UsersModule {}
