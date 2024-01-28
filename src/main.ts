import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import * as process from "process";
import * as dotenv from "dotenv";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Load ENVs from local `.env` file in development mode
  if (process.env?.NODE_ENV !== "production") {
    dotenv.config();
  }

  await app.listen(process.env.PORTFOLIO_PORT);
}

bootstrap();
