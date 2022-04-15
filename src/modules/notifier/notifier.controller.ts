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
    @Param('customId') jobId: string,
    @Req() req: Express.Request,
    @Body() replacementData: any,
  ): Promise<any> {
    throw new NotImplementedException();
  }

  @Post('/:customId')
  async sendNotificationPush(
    @Param('customId') jobId: string,
    @Req() req: Express.Request,
    @Body() replacementData: any,
  ): Promise<any> {
    throw new NotImplementedException();
  }
}
