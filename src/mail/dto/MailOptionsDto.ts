import { IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";
import { emailRegex } from "../../common/regex/regex";

/**
 * @param to should be a valid email
 * @param subject required, max 50 characters
 * @param content required, max 1000 characters
 * @param isHtml
 */
export class MailOptionsDto {
  @Matches(emailRegex, { message: "Invalid email format" })
  readonly to: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly subject: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  readonly content: string;

  readonly isHtml: boolean;

  constructor(to: string, subject: string, content: string, isHtml: boolean) {
    this.to = to;
    this.subject = subject;
    this.content = content;
    this.isHtml = isHtml;
  }
}
