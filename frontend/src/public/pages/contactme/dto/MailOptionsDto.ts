export default interface MailOptionsDto {
  to: string;
  replyTo: string;
  subject: string;
  content: string;
  isHtml?: boolean;
}
