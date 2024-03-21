export default interface ContactFormRequestDto {
  email: string;
  name: string;
  subject: string;
  content: string;
  isHtml?: boolean;
}
