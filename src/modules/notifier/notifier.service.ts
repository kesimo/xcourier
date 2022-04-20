import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Configuration } from 'config/config.model';
import { ServerConfiguration } from 'config/server-config.model';
import { ConfigurationService } from '../configuration/configuration.service';
import { MailTransmitterService } from '../mail-transmitter/mail-transmitter.service';
import { DefaultContext } from '../mail-transmitter/models/default-context.model';
import { StatusMessage } from './models/response-status.enum';

@Injectable()
export class NotifierService {
  protected serverConfiguration: ServerConfiguration;
  protected configuration: Configuration;
  logger = new Logger(NotifierService.name);

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
    if (config.default_template) {
      return this.mailService
        .sendDefaultMails(
          config.receivers,
          new DefaultContext(id, config.subject, {
            message: config.message || messageData,
            linked_url: config.linked_url || null,
            linked_url_tag: config.linked_url_tag || null,
          }),
        )
        .then(() => StatusMessage.success)
        .catch((error) => {
          this.logger.error(error);
          return StatusMessage.failed;
        });
    }

    //todo 2. get configuration from second service
    //todo 3. send emails to all defined receivers with selected template or default template
    return StatusMessage.success;
  }
}
