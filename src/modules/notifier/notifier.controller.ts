import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
  Req,
} from '@nestjs/common';
import { NotifierService } from './notifier.service';

@Controller('notifier')
export class NotifierController {
  constructor(private readonly notifierService: NotifierService) {}
  @Get()
  async sendNotificationGet(
    @Req() req: Express.Request,
    @Body() replacementData: any,
  ): Promise<any> {
    throw new NotImplementedException();
  }

  @Post()
  async sendNotificationPush(
    @Req() req: Express.Request,
    @Body() replacementData: any,
  ): Promise<any> {
    throw new NotImplementedException();
  }
}
