import {Module} from "@nestjs/common";
import {ProjectService} from "./service/ProjectService";
import {AdminProjectController} from "./controller/AdminProjectController";
import {DatabaseModule} from "../database/DatabaseModule";
import {ConverterModule} from "../common/converter/ConverterModule";

@Module({
  imports: [DatabaseModule, ConverterModule],
  providers: [ProjectService],
  controllers: [AdminProjectController]
})
export class ProjectsModule {
}
