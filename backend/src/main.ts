import { NestFactory } from "@nestjs/core";
import { AppModule } from "./AppModule";
import * as process from "process";
import * as cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import { helmetConfig } from "./common/config/helmetConfig";
import { getCorsConfig } from "./common/config/corsConfig";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORTFOLIO_PORT;
  if (!port) {
    throw new Error("Missing port ENV value");
  }

  // Set security headers
  app.use(helmet(helmetConfig));

  // CORS configuration
  const allowedOrigins = [
    `https://localhost`,
    `http://localhost`,
    `https://dnadas.net`,
    `https://api.github.com`
  ];
  app.enableCors(getCorsConfig(allowedOrigins));

  // Cookie parser
  app.use(cookieParser());

  // Use the DTO validation for all endpoints
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
}

bootstrap();
