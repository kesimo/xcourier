import { Controller, Get } from '@nestjs/common';
import { AppService, IReportStatus } from './app.service';

@Controller('report')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getReport(): IReportStatus {
    return this.appService.getReportStatus();
  }
}
