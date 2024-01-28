import {Injectable} from "@nestjs/common";
import {IPasswordEncoder} from "./IPasswordEncoder";
import * as bcrypt from "bcrypt";

@Injectable()
export class BcryptPasswordEncoder implements IPasswordEncoder {
  private static readonly SALT_ROUNDS: number = 10;

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, BcryptPasswordEncoder.SALT_ROUNDS);
  }
}
