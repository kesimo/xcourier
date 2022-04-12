import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'config/config.model';

@Injectable()
export class AppService {
  //protected serverConfiguration: ServerConfiguration;

  constructor(private configService: ConfigService) {
    /* this.serverConfiguration =
      this.configService.get<ServerConfiguration>('server');
    console.log(this.serverConfiguration.port);
    console.log(this.serverConfiguration.debug); */
  }
  getHello(): string {
    //console.log(this.serverConfiguration.api_key ?? 'null');
    return 'Hello World!';
  }
}
