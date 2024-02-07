import {Module} from "@nestjs/common";
import {ProjectService} from "./service/ProjectService";
import {AdminProjectController} from "./controller/AdminProjectController";
import {DatabaseModule} from "../database/DatabaseModule";
import {ConverterModule} from "../common/converter/ConverterModule";
import {CustomJwtModule} from "../auth/CustomJwtModule";
import {UsersModule} from "../users/UsersModule";
import {GithubUserService} from "./service/GithubUserService";
import {AdminGithubUserController} from "./controller/AdminGithubUserController";
import {GithubCodeSnippetService} from "./service/GithubCodeSnippetService";
import {
  AdminGithubCodeSnippetController
} from "./controller/AdminGithubCodeSnippetController";
import {ForwardModule} from "../forward/ForwardModule";

@Module({
  imports: [DatabaseModule, ConverterModule, CustomJwtModule, UsersModule, ForwardModule],
  providers: [ProjectService, GithubUserService, GithubCodeSnippetService],
  controllers: [AdminProjectController, AdminGithubUserController, AdminGithubCodeSnippetController]
})
export class ProjectsModule {
}
