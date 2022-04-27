import {
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IResponseStatus } from './models/response-status.model';
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
  ): Promise<IResponseStatus> {
    const status = this.notifierService.sendMailNotification(id, body);
    return status;
  }

  @Post('/:customId')
  async sendNotificationPush(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() body: any,
  ): Promise<IResponseStatus> {
    const status = this.notifierService.sendMailNotification(id, body);
    return status;
  }

  @Put('/:customId')
  async sendNotificationPut(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() body: any,
  ): Promise<IResponseStatus> {
    const status = this.notifierService.sendMailNotification(id, body);
    return status;
  }
}
