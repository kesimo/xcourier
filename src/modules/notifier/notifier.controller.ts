import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { StatusMessage } from './models/response-status.enum';
import { NotifierService } from './notifier.service';

@Controller('')
export class NotifierController {
  constructor(private readonly notifierService: NotifierService) {}

  @Get('/params')
  async sendNotificationByGetQuery(@Query() query) {
    console.log(query);
  }

  @Get('/:customId')
  async sendNotificationGet(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() replacementData: any,
  ): Promise<StatusMessage> {
    return this.notifierService.sendMailNotification(id, replacementData);
  }

  @Post('/:customId')
  async sendNotificationPush(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() replacementData: any,
  ): Promise<StatusMessage> {
    return this.notifierService.sendMailNotification(id, replacementData);
  }
}
