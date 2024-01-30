import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata
} from "@nestjs/common";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { UserResponsePrivateDto } from "../../users/dto/UserResponsePrivateDto";
import { Role } from "@prisma/client";
import { Reflector } from "@nestjs/core";

const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler()
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: UserResponsePrivateDto = request.user;

    if (!user?.role || !requiredRoles.includes(user.role)) {
      throw new UnauthorizedError();
    }
    return true;
  }
}
