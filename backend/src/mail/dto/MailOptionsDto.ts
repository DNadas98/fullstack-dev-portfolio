import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength} from "class-validator";
import {emailRegex} from "../../common/validator/validator";

/**
 * @param to should be a valid email
 * @param subject required, max 50 characters
 * @param content required, max 1000 characters
 * @param isHtml
 */
export class MailOptionsDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  readonly to: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  readonly replyTo: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly subject: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  readonly content: string;

  readonly isHtml: boolean;

  constructor(to: string, subject: string, content: string, isHtml: boolean, replyTo: string, name: string) {
    this.to = to;
    this.replyTo = replyTo;
    this.subject = subject;
    this.content = content;
    this.isHtml = isHtml;
    this.name = name;
  }
}
