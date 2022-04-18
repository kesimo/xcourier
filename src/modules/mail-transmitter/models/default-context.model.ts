import { MailContext } from './context.model';

export class DefaultContext extends MailContext {
  id: string = null;
  subject = '';
  message = 'no message arrived';
  linked_url = null;
  linked_url_tag = null;

  constructor(id, subject, partial: Partial<DefaultContext>) {
    super(id, subject);
    Object.assign(this, partial);
  }
}
