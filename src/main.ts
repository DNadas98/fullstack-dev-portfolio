import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as process from "process";
import * as dotenv from "dotenv";
import * as cookieParser from "cookie-parser";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Load ENVs from local `.env` file in development mode
  if (process.env?.NODE_ENV !== "production") {
    dotenv.config();
  }

  app.use(cookieParser());

  // Use the DTO validation for all endpoints
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORTFOLIO_PORT);
}

bootstrap();
