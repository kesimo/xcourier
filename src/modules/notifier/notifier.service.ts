import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'config/config.model';
import { ServerConfiguration } from 'config/server-config.model';

@Injectable()
export class NotifierService {
  protected serverConfiguration: ServerConfiguration;
  protected configuration: Configuration;

  constructor(private configService: ConfigService) {
    this.serverConfiguration =
      this.configService.get<ServerConfiguration>('server');
    console.log(this.serverConfiguration);
    console.log(this.serverConfiguration.port);
    this.configuration = this.configService.get<Configuration>('email');
    console.log(this.configuration);
  }
}
