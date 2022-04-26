import { MailContext } from './context.model';

export class DefaultContext implements MailContext {
  id: string = null;
  subject = '';
  message = 'no message arrived';
  raw_data: any = null;
  cleaned_data:
    | Array<{ key: string; value: string | string[]; isEven: boolean }>
    | string = null;
  linked_url = null;
  linked_url_tag = null;
  timestamp: Date = null;

  constructor(id, subject, partial: Partial<DefaultContext>) {
    this.id = id;
    this.subject = subject;
    Object.assign(this, partial);
  }
}
