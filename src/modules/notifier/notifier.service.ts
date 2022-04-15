import { Injectable } from '@nestjs/common';
import { Configuration } from 'config/config.model';
import { ServerConfiguration } from 'config/server-config.model';
import { ConfigurationService } from '../configuration/configuration.service';
import { StatusMessage } from './models/response-status.enum';

@Injectable()
export class NotifierService {
  protected serverConfiguration: ServerConfiguration;
  protected configuration: Configuration;

  constructor(private configurationService: ConfigurationService) {}

  async sendMailNotification(
    id: string,
    messageData: any,
  ): Promise<StatusMessage> {
    //todo 1. check if entrypoint is defined
    //todo 2. get configuration from second service
    //todo 3. send emails to all defined receivers with selected template or default template
    return StatusMessage.success;
  }
}
