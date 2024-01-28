import {Module} from "@nestjs/common";
import {PrismaUserService} from "./service/PrismaUserService";
import {DatabaseModule} from "../database/database.module";
import {AuthModule} from "../auth/AuthModule";
import {IUserService} from "./service/IUserService";

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [{provide: IUserService, useClass: PrismaUserService}],
  exports: [{provide: IUserService, useClass: PrismaUserService}]
})
export class UsersModule {
}
