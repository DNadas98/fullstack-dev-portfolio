import {Module} from "@nestjs/common";
import {ProjectService} from "./service/ProjectService";
import {AdminProjectController} from "./controller/AdminProjectController";
import {DatabaseModule} from "../database/DatabaseModule";
import {ConverterModule} from "../common/converter/ConverterModule";
import {CustomJwtModule} from "../auth/CustomJwtModule";
import {UsersModule} from "../users/UsersModule";
import {GithubUserService} from "./service/GithubUserService";
import {AdminGithubUserController} from "./controller/AdminGithubUserController";

@Module({
  imports: [DatabaseModule, ConverterModule, CustomJwtModule, UsersModule],
  providers: [ProjectService, GithubUserService],
  controllers: [AdminProjectController,AdminGithubUserController]
})
export class ProjectsModule {
}
