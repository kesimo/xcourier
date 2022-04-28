import {
  Body,
  Controller,
  Get,
  NotFoundException,
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
  @UseGuards(AuthGuard('basic'))
  async sendNotificationByGetQuery(@Query() query) {
    if (!query.id) throw new NotFoundException('Endpoint id is missing');
    const status = this.notifierService.sendMailNotification(query.id, query);
    return status;
  }

  @Post('/params')
  @UseGuards(AuthGuard('basic'))
  async sendNotificationByPostQuery(@Query() query: any) {
    if (!query.id) throw new NotFoundException('Endpoint id is missing');
    const status = this.notifierService.sendMailNotification(query.id, query);
    return status;
  }

  @Get('/:customId')
  @UseGuards(AuthGuard('basic'))
  async sendNotificationGet(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() body: any,
    @Query() query: any,
  ): Promise<IResponseStatus> {
    const data = { ...query, ...body };
    //console.log(data);
    const status = this.notifierService.sendMailNotification(id, data);
    return status;
  }

  @Post('/:customId')
  async sendNotificationPush(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() body: any,
    @Query() query: any,
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
