import { Module } from "@nestjs/common";
import { ProjectService } from "./service/ProjectService";
import { AdminProjectController } from "./controller/AdminProjectController";
import { DatabaseModule } from "../database/DatabaseModule";
import { ConverterModule } from "../common/converter/ConverterModule";
import { CustomJwtModule } from "../auth/CustomJwtModule";
import { UsersModule } from "../users/UsersModule";
import { GithubUserService } from "./service/GithubUserService";
import { AdminGithubUserController } from "./controller/AdminGithubUserController";
import { GithubCodeSnippetService } from "./service/GithubCodeSnippetService";
import { AdminGithubCodeSnippetController } from "./controller/AdminGithubCodeSnippetController";
import { ForwardModule } from "../forward/ForwardModule";
import { GithubApiController } from "./controller/GithubApiController";
import { GithubApiService } from "./service/GithubApiService";

@Module({
  imports: [
    DatabaseModule,
    ConverterModule,
    CustomJwtModule,
    UsersModule,
    ForwardModule
  ],
  providers: [
    ProjectService,
    GithubUserService,
    GithubCodeSnippetService,
    GithubApiService
  ],
  controllers: [
    AdminProjectController,
    AdminGithubUserController,
    AdminGithubCodeSnippetController,
    GithubApiController
  ]
})
export class ProjectsModule {}
