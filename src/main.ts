import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule";
import * as process from "process";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORTFOLIO_PORT;
  if (!port) {
    throw new Error("Missing port ENV value");
  }

  app.use(cookieParser());

  // Use the DTO validation for all endpoints
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}

bootstrap();
