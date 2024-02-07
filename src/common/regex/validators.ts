import {BadRequestException} from "@nestjs/common";

export function validateId(id: any) {
  if (!id || isNaN(parseInt(id)) || id < 1) {
    throw new BadRequestException("The provided ID is invalid");
  }
}
