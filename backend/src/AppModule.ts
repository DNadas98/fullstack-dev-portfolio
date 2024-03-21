import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/DatabaseModule";
import { UsersModule } from "./users/UsersModule";
import { AuthModule } from "./auth/AuthModule";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./mail/MailModule";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { globalRateLimiterOptions } from "./common/config/rateLimiterOptions";
import { APP_GUARD } from "@nestjs/core";
import { ProjectsModule } from "./projects/ProjectsModule";

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([globalRateLimiterOptions]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    MailModule,
    ProjectsModule
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }]
})
export class AppModule {}
