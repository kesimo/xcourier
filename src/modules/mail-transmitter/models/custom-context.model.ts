import { MailContext } from './context.model';

export class CustomContext implements MailContext {
  id: string = null;
  subject = '';
  message = 'no message arrived';
  raw_data: any = null;
  timestamp: Date = null;

  constructor(id, subject, partial: Partial<CustomContext>) {
    this.id = id;
    this.subject = subject;
    Object.assign(this, partial);
  }
}
