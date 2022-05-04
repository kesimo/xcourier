import {
  Body,
  Controller,
  Get,
  NotFoundException,
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

  /**
   * Default GET Entrypoint
   *
   * @param {*} query input parameters (id required) -> Query only, body ignored
   * @return {*}  {Promise<IResponseStatus>} action result containing status and count of sent mails
   * @memberof NotifierController
   */
  @Get('/params')
  @UseGuards(AuthGuard('basic'))
  async sendNotificationByGetQuery(@Query() query): Promise<IResponseStatus> {
    if (!query.id) throw new NotFoundException('Endpoint id is missing');
    const data = await this.notifierService.mergeContextData(
      query.id,
      null,
      query,
    );
    const status = this.notifierService.sendMailNotification(query.id, data);
    return status;
  }

  /**
   * Default POST Entrypoint
   *
   * @param {*} query input parameters (id required) -> query only, body ignored
   * @return {*}  {Promise<IResponseStatus>} action result containing status and count of sent mails
   * @memberof NotifierController
   */
  @Post('/params')
  @UseGuards(AuthGuard('basic'))
  async sendNotificationByPostQuery(
    @Query() query: any,
  ): Promise<IResponseStatus> {
    if (!query.id) throw new NotFoundException('Endpoint id is missing');
    const data = await this.notifierService.mergeContextData(
      query.id,
      null,
      query,
    );
    const status = this.notifierService.sendMailNotification(query.id, data);
    return status;
  }

  /**
   * Extended GET Entrypoint
   *
   * @param {string} id id of defined entrypoint (configured in yaml)
   * @param {Express.Request} req
   * @param {*} body json body with notification data
   * @param {*} query input parameters (id required)
   * @return {*}  {Promise<IResponseStatus>} action result containing status and count of sent mails
   * @memberof NotifierController
   */
  @Get('/:customId')
  @UseGuards(AuthGuard('basic'))
  async sendNotificationGet(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() body: any,
    @Query() query: any,
  ): Promise<IResponseStatus> {
    const data = await this.notifierService.mergeContextData(id, body, query);
    const status = this.notifierService.sendMailNotification(id, data);
    return status;
  }

  /**
   * Extended POST Entrypoint (Copy of GET)
   *
   * @param {string} id id of defined entrypoint (configured in yaml)
   * @param {Express.Request} req
   * @param {*} body json body with notification data
   * @param {*} query input parameters (id required)
   * @return {*}  {Promise<IResponseStatus>} action result containing status and count of sent mails
   * @memberof NotifierController
   */
  @Post('/:customId')
  async sendNotificationPush(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() body: any,
    @Query() query: any,
  ): Promise<IResponseStatus> {
    const data = await this.notifierService.mergeContextData(id, body, query);
    const status = this.notifierService.sendMailNotification(id, data);
    return status;
  }

  /**
   * Extended PUT Entrypoint (Copy of GET)
   *
   * @param {string} id id of defined entrypoint (configured in yaml)
   * @param {Express.Request} req
   * @param {*} body json body with notification data
   * @param {*} query input parameters (id required)
   * @return {*}  {Promise<IResponseStatus>} action result containing status and count of sent mails
   * @memberof NotifierController
   */
  @Put('/:customId')
  async sendNotificationPut(
    @Param('customId') id: string,
    @Req() req: Express.Request,
    @Body() body: any,
    @Query() query: any,
  ): Promise<IResponseStatus> {
    const data = await this.notifierService.mergeContextData(id, body, query);
    const status = this.notifierService.sendMailNotification(id, data);
    return status;
  }
}
