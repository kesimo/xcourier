import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('basic'))
  async sendNotificationGet(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() body: any,
  ): Promise<StatusMessage> {
    return this.notifierService.sendMailNotification(id, body);
  }

  @Post('/:customId')
  async sendNotificationPush(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() body: any,
  ): Promise<StatusMessage> {
    return this.notifierService.sendMailNotification(id, body);
  }
}
