import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Configuration, PayloadType } from 'config/config.model';
import { ServerConfiguration } from 'config/server-config.model';
import { ObjectConverter } from 'src/utils/object-converter.util';
import { ConfigurationService } from '../configuration/configuration.service';
import { MailTransmitterService } from '../mail-transmitter/mail-transmitter.service';
import { CustomContext } from '../mail-transmitter/models/custom-context.model';
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
    //convert JSON Body to message parsed in html email template
    const rawData = data ? JSON.stringify(data) : 'No data received';
    if (!config.template && !config.template_path) {
      //convert JSON Body to array for table visualizations
      const parsedJsonBody = ObjectConverter.convertToOneLevelArray(data);
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
    } else if (config.template_path) {
      //todo send mails with custom template
      return this.mailService
        .sendCustomMails(
          config.receivers,
          new CustomContext(id, config.subject, {
            message:
              config.message ||
              data.message ||
              'New notification from entrypoint with id' + config.id,
            raw_data: rawData,
            timestamp: new Date(),
          }),
          data,
          config.template_path,
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
    } else {
      //feature send mails with template string
      return {
        status: StatusMessage.unknown,
        sentMails: 0,
      };
    }
  }

  //helpers
  async getPreferredData(id: string, body: any, query: any): Promise<any> {
    const config = this.configurationService.getEndpointConfiguration(id);
    switch (config.payload_type) {
      case PayloadType.onlyJson:
        return body;
      case PayloadType.onlyQuery:
        return query;
      case PayloadType.onlyMessage:
        return null;
      case PayloadType.preferJson:
        return ObjectConverter.mergeDefaultValues(query, body);
      case PayloadType.preferQuery:
        return ObjectConverter.mergeDefaultValues(body, query);
      default:
        //prefer json is the default case if nothing is set
        if (Object.keys(body).length === 0 && Object.keys(query).length === 0) {
          return null;
        } else return ObjectConverter.mergeDefaultValues(query, body);
        break;
    }
  }
}
