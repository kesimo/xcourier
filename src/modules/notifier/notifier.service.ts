import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Configuration } from 'config/config.model';
import { ServerConfiguration } from 'config/server-config.model';
import { JsonConverter } from 'src/utils/json-converter.util';
import { ConfigurationService } from '../configuration/configuration.service';
import { MailTransmitterService } from '../mail-transmitter/mail-transmitter.service';
import { DefaultContext } from '../mail-transmitter/models/default-context.model';
import { IResponseStatus } from './models/response-status.model';
import { StatusMessage } from './models/status-message.enum';

@Injectable()
export class NotifierService {
  protected serverConfiguration: ServerConfiguration;
  protected configuration: Configuration;
  logger = new Logger(NotifierService.name);

  constructor(
    private configurationService: ConfigurationService,
    private mailService: MailTransmitterService,
  ) {}

  async sendMailNotification(id: string, data: any): Promise<IResponseStatus> {
    const config = this.configurationService.getEndpointConfiguration(id);
    if (!config) {
      throw new NotFoundException();
    }
    if (config.receivers.length === 0) {
      throw new ConflictException();
    }
    if (config.default_template) {
      //convert JSON Body to array for table visualizations
      const parsedJsonBody = JsonConverter.convertToOneLevelArray(data);
      console.log(parsedJsonBody);
      //convert JSON Body to message parsed in html email template
      const rawData = data ? JSON.stringify(data) : 'No data received';
      return this.mailService
        .sendDefaultMails(
          config.receivers,
          new DefaultContext(id, config.subject, {
            message:
              config.message ||
              data.message ||
              'New notification from entrypoint with id' + config.id,
            raw_data: rawData,
            cleaned_data:
              parsedJsonBody.length > 0 ? parsedJsonBody : 'No data received',
            linked_url: config.linked_url || data.linked_url || null,
            linked_url_tag:
              config.linked_url_tag || data.linked_url_tag || null,
            timestamp: new Date(),
          }),
        )
        .then(() => ({
          status: StatusMessage.success,
          sentMails: config.receivers.length,
        }))
        .catch((error) => {
          this.logger.error(error);
          return {
            status: StatusMessage.failed,
            sentMails: 0,
          };
        });
    }

    //todo 2. get configuration from second service
    //todo 3. send emails to all defined receivers with selected template or default template
    return {
      status: StatusMessage.unknown,
      sentMails: 0,
    };
  }
}
