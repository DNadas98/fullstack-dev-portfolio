import {Role} from "@prisma/client";

export class UserResponsePrivateDto {
  constructor(
    private readonly _id: number,
    private readonly _createdAt: Date,
    private readonly _updatedAt: Date,
    private readonly _email: string,
    private readonly _username: string,
    private readonly _role: Role,
    private readonly _enabled: boolean,
    private readonly _active: boolean
  ) {
  }

  get id(): number {
    return this._id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
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

  get enabled(): boolean {
    return this._enabled;
  }

  get active(): boolean {
    return this._active;
  }
}
