import {IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

/**
 * @param subject required, max 50 characters
 * @param content required, max 1000 characters
 * @param isHtml
 */
export class ContactFormRequestDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly subject: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  readonly content: string;

  readonly isHtml: boolean;

  constructor(subject: string, content: string, isHtml: boolean) {
    this.subject = subject;
    this.content = content;
    this.isHtml = isHtml;
  }
}
