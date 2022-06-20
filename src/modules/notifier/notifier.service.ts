import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  Configuration,
  PayloadType,
} from 'src/modules/configuration/config.model';
import { ServerConfiguration } from 'src/modules/configuration/server-config.model';
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
      throw new NotFoundException(`configuration not found (id: ${id})`);
    }
    if (config.receivers.length === 0) {
      throw new ConflictException('no receivers found');
    }
    //convert JSON Body to message parsed in html email template
    const rawData = data ? JSON.stringify(data) : 'No data received';
    if (/* !config.template && */ !config.template_path) {
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
  async mergeContextData(id: string, body: any, query: any): Promise<any> {
    const config = this.configurationService.getEndpointConfiguration(id);
    let mergedData = null;
    switch (config.payload_type) {
      case PayloadType.onlyJson:
        mergedData = body;
        break;
      case PayloadType.onlyQuery:
        mergedData = query;
        break;
      case PayloadType.onlyMessage:
        mergedData = null;
        break;
      case PayloadType.preferJson:
        mergedData = ObjectConverter.mergeDefaultValues(query, body);
        break;
      case PayloadType.preferQuery:
        mergedData = ObjectConverter.mergeDefaultValues(body, query);
        break;
      default:
        //prefer json is the default case if nothing is set
        if (Object.keys(body).length === 0 && Object.keys(query).length === 0) {
          mergedData = null;
        } else mergedData = ObjectConverter.mergeDefaultValues(query, body);
        break;
    }
    if (config.template_defaults) {
      return ObjectConverter.mergeDefaultValues(
        config.template_defaults,
        mergedData,
      );
    }
    return mergedData;
  }
}
