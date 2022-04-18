import { Injectable, NotFoundException } from '@nestjs/common';
import { Configuration } from 'config/config.model';
import { ServerConfiguration } from 'config/server-config.model';
import { ConfigurationService } from '../configuration/configuration.service';
import { MailTransmitterService } from '../mail-transmitter/mail-transmitter.service';
import { StatusMessage } from './models/response-status.enum';

@Injectable()
export class NotifierService {
  protected serverConfiguration: ServerConfiguration;
  protected configuration: Configuration;

  constructor(
    private configurationService: ConfigurationService,
    private mailService: MailTransmitterService,
  ) {}

  async sendMailNotification(
    id: string,
    messageData: any,
  ): Promise<StatusMessage> {
    const config = this.configurationService.getEndpointConfiguration(id);
    if (!config) {
      throw new NotFoundException();
    }

    //todo 2. get configuration from second service
    //todo 3. send emails to all defined receivers with selected template or default template
    return StatusMessage.success;
  }
}
