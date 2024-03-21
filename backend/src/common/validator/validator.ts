import { BadRequestException } from "@nestjs/common";

export function validateId(id: any) {
  if (!id || isNaN(parseInt(id)) || id < 1) {
    throw new BadRequestException("The provided ID is invalid");
  }
}

/**
 * Checks for a standard email format:
 * - Starts with alphanumeric characters, dot (.), underscore (_), or hyphen (-).
 * - An @ symbol.
 * - More alphanumeric characters, dot (.), or hyphen (-) for the domain part.
 * - A dot (.) followed by 2 to 6 alphabetic characters for the top-level domain.
 * - Minimum 6, maximum 100 characters.
 * @type {RegExp}
 */
export const emailRegex =
  /^(?=.{6,100}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

/**
 * Checks password format:
 * - At least one lowercase letter.
 * - At least one uppercase letter.
 * - At least one digit.
 * - Minimum 9, maximum 100 characters.
 * @type {RegExp}
 */
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{9,100}$/;

/**
 * Checks username format:
 * - Can contain alphanumeric characters, dot (.), underscore (_), or hyphen (-).
 * - Minimum 3, maximum 16 characters.
 * @type {RegExp}
 */
export const usernameRegex = /^[a-zA-Z0-9._-]{3,16}$/;
