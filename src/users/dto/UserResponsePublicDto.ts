import {Role} from "@prisma/client";

export class UserResponsePublicDto {
  constructor(
    private readonly _id: number,
    private readonly _email: string,
    private readonly _username: string,
    private readonly _role: Role,
  ) {
  }

  get id(): number {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get username(): string {
    return this._username;
  }

  get role(): Role {
    return this._role;
  }
}
