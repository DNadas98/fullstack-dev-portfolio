import { Module } from "@nestjs/common";
import { DtoConverterService } from "./service/DtoConverterService";

@Module({
  providers: [DtoConverterService],
  exports: [DtoConverterService]
})
export class ConverterModule {}
