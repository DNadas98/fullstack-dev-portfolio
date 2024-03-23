import { Module } from "@nestjs/common";
import { ProjectService } from "./service/ProjectService";
import { AdminProjectController } from "./controller/AdminProjectController";
import { DatabaseModule } from "../database/DatabaseModule";
import { ConverterModule } from "../common/converter/ConverterModule";
import { CustomJwtModule } from "../auth/CustomJwtModule";
import { UsersModule } from "../users/UsersModule";
import { StoredGithubUserService } from "./service/StoredGithubUserService";
import { AdminStoredGithubUserController } from "./controller/AdminStoredGithubUserController";
import { CodeSnippetService } from "./service/CodeSnippetService";
import { AdminCodeSnippetController } from "./controller/AdminCodeSnippetController";

@Module({
  imports: [DatabaseModule, ConverterModule, CustomJwtModule, UsersModule],
  providers: [ProjectService, StoredGithubUserService, CodeSnippetService],
  controllers: [
    AdminProjectController,
    AdminStoredGithubUserController,
    AdminCodeSnippetController
  ],
  exports: [ProjectService, StoredGithubUserService, CodeSnippetService]
})
export class ProjectsModule {}
