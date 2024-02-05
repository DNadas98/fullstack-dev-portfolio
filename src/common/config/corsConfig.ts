import {ForbiddenException} from "@nestjs/common";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

export function getCorsConfig(allowedOrigins: string[]): CorsOptions {
  return {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        const e = new ForbiddenException("Not allowed by CORS");
        callback(e);
      }
    },
    optionsSuccessStatus: 204,
    credentials: true
  };
}
