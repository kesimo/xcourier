import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailConfiguration, EndpointConfiguration } from 'config/config.model';
import { ServerConfiguration } from 'config/server-config.model';

@Injectable()
export class ConfigurationService {
  protected readonly serverConfiguration: ServerConfiguration;
  protected readonly emailConfiguration: EmailConfiguration;
  protected readonly endpointConfigurations: EndpointConfiguration[];

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
    let endpointConfiguration = null;
    for (const endpoint of this.endpointConfigurations) {
      if (endpoint.id === id) {
        endpointConfiguration = endpoint;
      }
    }
    return endpointConfiguration;
  }
}
