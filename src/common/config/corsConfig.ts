import {ForbiddenException} from "@nestjs/common";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

/**
 * Cross Origin Resource Sharing configuration options
 * @param allowedOrigins The URLs that will be allowed access by CORS, optional, if
 * not provided, all origins are allowed
 * @link https://docs.nestjs.com/security/cors
 * <br>
 * TODO: remove !origin -- only for development
 */
export function getCorsConfig(allowedOrigins: string[] | null = null): CorsOptions {
  return {
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: (origin, callback) => {
      if (!origin || !allowedOrigins) {
        callback(null, true);
      } else if (allowedOrigins.indexOf(origin) !== -1) {
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
