import { Module } from "@nestjs/common";
import { DatabaseService } from "./service/DatabaseService";

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
