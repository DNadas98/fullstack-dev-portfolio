import { Module } from "@nestjs/common";
import { ProjectsModule } from "../projects/ProjectsModule";
import { ForwardModule } from "../forward/ForwardModule";
import { GithubApiService } from "./service/GithubApiService";
import { GithubApiController } from "./controller/GithubApiController";

@Module({
  imports: [ProjectsModule, ForwardModule],
  providers: [GithubApiService],
  controllers: [GithubApiController]
})
export class GithubModule {}
