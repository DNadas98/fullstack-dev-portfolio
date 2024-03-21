import { Module } from "@nestjs/common";
import { IJwtService } from "./service/IJwtService";
import { CustomJwtService } from "./service/CustomJwtService";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [JwtModule, ConfigModule],
  providers: [{ provide: IJwtService, useClass: CustomJwtService }],
  exports: [{ provide: IJwtService, useClass: CustomJwtService }]
})
export class CustomJwtModule {}
