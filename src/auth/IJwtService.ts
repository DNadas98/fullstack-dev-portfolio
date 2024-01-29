import {JwtPayloadDto} from "./dto/JwtPayloadDto";

export abstract class IJwtService {
  abstract signBearerToken(payloadDto: JwtPayloadDto): Promise<string>;
  abstract signRefreshToken(payloadDto: JwtPayloadDto): Promise<string>;
  abstract verifyBearerToken(bearerToken: string): Promise<JwtPayloadDto>;
  abstract verifyRefreshToken(refreshToken: string): Promise<JwtPayloadDto>;
}
