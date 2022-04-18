import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'config/config.model';
import { ServerConfiguration } from 'config/server-config.model';
import * as os from 'os';
export interface IReportStatus {
  status: 'up' | 'down' | 'unknown';
  os: {
    hostname: string;
    cpus: os.CpuInfo[];
    total_memory: number;
    free_memory: number;
    load_average: number[];
    uptime: number;
    user_info: any;
  };
}
@Injectable()
export class AppService {
  protected serverConfiguration: ServerConfiguration;
  protected configuration: Configuration;

  constructor(private configService: ConfigService) {}

  getReportStatus(): IReportStatus {
    //console.log(this.serverConfiguration.api_key ?? 'null');
    return {
      status: 'up',
      os: {
        hostname: os.hostname(),
        cpus: os.cpus(),
        total_memory: os.totalmem(),
        free_memory: os.freemem(),
        load_average: os.loadavg(),
        uptime: os.uptime(),
        user_info: os.userInfo(),
      },
    };
  }
}
