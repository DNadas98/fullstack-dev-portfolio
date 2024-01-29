import {Injectable} from "@nestjs/common";
import {IJwtService} from "./IJwtService";
import {JwtPayloadDto} from "./dto/JwtPayloadDto";
import {
  JwtService,
  JwtSignOptions,
  JwtVerifyOptions,
  TokenExpiredError
} from "@nestjs/jwt";
import {JwtExpiredError} from "./error/JwtExpiredError";
import {ConfigService} from "@nestjs/config";

/**
 * @link https://docs.nestjs.com/security/authentication#jwt-token
 * @see JwtService
 */
@Injectable()
export class CustomJwtService implements IJwtService {

  constructor(private readonly jwt: JwtService, private readonly configService: ConfigService) {
  }

  async signBearerToken(payloadDto: JwtPayloadDto): Promise<string> {
    const options: JwtSignOptions = {
      secret: this.configService.get("PORTFOLIO_BEARER_TOKEN_SECRET"),
      expiresIn: this.configService.get("PORTFOLIO_BEARER_TOKEN_EXPIRES_IN"),
      algorithm: "HS256"
    };
    return await this.jwt.signAsync({...payloadDto}, options);
  }

  async signRefreshToken(payloadDto: JwtPayloadDto): Promise<string> {
    const options: JwtSignOptions = {
      secret: this.configService.get("PORTFOLIO_REFRESH_TOKEN_SECRET"),
      expiresIn: this.configService.get("PORTFOLIO_REFRESH_TOKEN_EXPIRES_IN"),
      algorithm: "HS256"
    };
    return await this.jwt.signAsync({...payloadDto}, options);
  }

  async verifyBearerToken(bearerToken: string): Promise<JwtPayloadDto> {
    try {
      const options: JwtVerifyOptions = {
        secret: this.configService.get("PORTFOLIO_BEARER_TOKEN_SECRET"),
        algorithms: ["HS256"]
      };
      return await this.jwt.verifyAsync(bearerToken, options);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new JwtExpiredError("Bearer token expired");
      }
      throw e;
    }
  }

  async verifyRefreshToken(refreshToken: string): Promise<JwtPayloadDto> {
    try {
      const options: JwtVerifyOptions = {
        secret: this.configService.get("PORTFOLIO_REFRESH_TOKEN_SECRET"),
        algorithms: ["HS256"]
      };
      return await this.jwt.verifyAsync(refreshToken, options);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new JwtExpiredError("Refresh token expired");
      }
      throw e;
    }
  }
}
