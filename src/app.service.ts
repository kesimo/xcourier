import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'config/config.model';
import { ServerConfiguration } from 'config/server-config.model';

@Injectable()
export class AppService {
  protected serverConfiguration: ServerConfiguration;
  protected configuration: Configuration;

  constructor(private configService: ConfigService) {
    this.configuration = this.configService.get<Configuration>('email');
    console.log(this.configuration);
  }
  getHello(): string {
    //console.log(this.serverConfiguration.api_key ?? 'null');
    return 'Hello World!';
  }
}
