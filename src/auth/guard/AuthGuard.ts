import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { IJwtService } from "../service/IJwtService";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { UserService } from "../../users/service/UserService";
import { JwtPayloadDto } from "../dto/JwtPayloadDto";
import { UserResponsePrivateDto } from "../../users/dto/UserResponsePrivateDto";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: IJwtService,
    private userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = this.extractTokenFromHeader(request);
    if (!bearerToken) {
      throw new UnauthorizedError();
    }
    try {
      const payload: JwtPayloadDto =
        await this.jwtService.verifyBearerToken(bearerToken);
      const user: UserResponsePrivateDto = await this.userService.readByEmail(
        payload.email
      );
      request["user"] = user;
    } catch {
      throw new UnauthorizedError();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    return request.headers.authorization?.split("Bearer ")[1];
  }
}
