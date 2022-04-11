import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfiguration, IServerConfiguration } from 'config/config.model';

@Injectable()
export class AppService {
  protected serverConfiguration: IServerConfiguration;

  constructor(private configService: ConfigService) {
    this.serverConfiguration =
      this.configService.get<IServerConfiguration>('server');
    console.log(this.serverConfiguration.port);
    console.log(this.serverConfiguration.debug);
  }
  getHello(): string {
    console.log(this.serverConfiguration.api_key ?? 'null');
    return 'Hello World!';
  }
}
