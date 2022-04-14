import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'config/config.model';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs';

/**
 * Mailing service for sending mails with handlebars template
 *
 * @export
 * @class MailTransmitterService
 */
@Injectable()
export class MailTransmitterService {
  protected configuration: Configuration;
  private readonly logger = new Logger(MailTransmitterService.name);

  constructor(
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {
    this.configuration = this.configService.get<Configuration>('email');
  }
  /**
   * send a email and replace template text
   *
   * @param {any} context
   * @param {string} receiver
   * @return {*}  {Promise<any>}
   * @memberof MailTransmitterService
   */
  async sendJobOffer(receiver: string, context: any): Promise<any> {
    const path = join(
      process.cwd(),
      'src',
      'modules',
      'mail',
      'mail-templates',
      'job-request.hbs',
    );
    if (!fs.existsSync(path)) {
      this.logger.error('Mail template not found available: ', path);
      throw new InternalServerErrorException();
    }
    this.logger.log('sending mail to ' + receiver);
    return this.mailerService
      .sendMail({
        to: receiver,
        subject: 'Subject',
        text: `text`,
        template: path,
        context: context,
      })
      .then(() => this.logger.log('mail successfully sent'))
      .catch((err) => {
        throw err;
      });
  }
}
