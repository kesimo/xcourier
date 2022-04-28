import { StatusMessage } from './status-message.enum';

export interface IResponseStatus {
  status: StatusMessage;
  sentMails: number;
}
