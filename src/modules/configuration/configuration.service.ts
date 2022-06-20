import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  EmailConfiguration,
  EndpointConfiguration,
} from 'src/modules/configuration/config.model';
import { ServerConfiguration } from 'src/modules/configuration/server-config.model';

@Injectable()
export class ConfigurationService {
  protected readonly serverConfiguration: ServerConfiguration;
  protected readonly emailConfiguration: EmailConfiguration;
  protected readonly endpointConfigurations: EndpointConfiguration[];
  logger = new Logger(ConfigurationService.name);

  constructor(private configService: ConfigService) {
    this.serverConfiguration =
      this.configService.get<ServerConfiguration>('server');
    this.emailConfiguration =
      this.configService.get<EmailConfiguration>('email');
    this.endpointConfigurations =
      this.configService.get<EndpointConfiguration[]>('endpoints');
  }

  getServerConfiguration(): ServerConfiguration {
    return this.serverConfiguration;
  }

  getMailConfiguration(): EmailConfiguration {
    return this.emailConfiguration;
  }

  getEndpointConfiguration(id: string): EndpointConfiguration | null {
    for (const endpoint of this.endpointConfigurations) {
      //prefer first endpoint found
      if (endpoint.id.trim() === id) {
        return endpoint;
      }
    }
    this.logger.warn('no endpoint found for id: /' + id);
  }
}
