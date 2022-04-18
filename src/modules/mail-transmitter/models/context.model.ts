export class MailContext {
  id: string;
  subject: string;
  constructor(id: string, subject: string) {
    this.id = id;
    this.subject = subject;
  }
}
