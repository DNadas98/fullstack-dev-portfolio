import {Module} from "@nestjs/common";
import {ProjectService} from "./service/ProjectService";
import {ProjectController} from "./controller/ProjectController";
import {DatabaseModule} from "../database/DatabaseModule";
import {ConverterModule} from "../common/converter/ConverterModule";

@Module({
  imports: [DatabaseModule, ConverterModule],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectsModule {
}
