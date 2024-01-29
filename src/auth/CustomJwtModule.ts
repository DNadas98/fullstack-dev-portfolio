import {Module} from "@nestjs/common";
import {IJwtService} from "./IJwtService";
import {CustomJwtService} from "./CustomJwtService";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [JwtModule],
  providers: [
    {provide: IJwtService, useClass: CustomJwtService}
  ],
  exports: [
    {provide: IJwtService, useClass: CustomJwtService}
  ]
})
export class CustomJwtModule {
}
