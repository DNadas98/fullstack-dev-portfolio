import { Role } from "@prisma/client";

export class UserResponsePrivateDto {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly email: string;
  readonly username: string;
  readonly role: Role;
  readonly enabled: boolean;
  readonly active: boolean;

  constructor(
    id: number,
    createdAt: Date,
    updatedAt: Date,
    email: string,
    username: string,
    role: Role,
    enabled: boolean,
    active: boolean
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.email = email;
    this.username = username;
    this.role = role;
    this.enabled = enabled;
    this.active = active;
  }
}
