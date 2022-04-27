import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, EmailConfiguration } from 'config/config.model';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs';
import { ConfigurationService } from '../configuration/configuration.service';
import { DefaultContext } from './models/default-context.model';

/**
 * Mailing service for sending mails with handlebars template
 *
 * @export
 * @class MailTransmitterService
 */
@Injectable()
export class MailTransmitterService {
  protected configuration: EmailConfiguration;
  private readonly logger = new Logger(MailTransmitterService.name);

  constructor(
    private configService: ConfigurationService,
    private mailerService: MailerService,
  ) {
    this.configuration = this.configService.getMailConfiguration();
  }
  /**
   * send a email and replace template text
   *
   * @param {DefaultContext} context
   * @param {string} receiver
   * @return {*}  {Promise<any>}
   * @memberof MailTransmitterService
   */
  async sendDefaultMails(
    receiver: string[],
    context: DefaultContext,
  ): Promise<any> {
    const defaultMessageTemplatePath = join(
      process.cwd(),
      'src',
      'modules',
      'mail-transmitter',
      'mail-templates',
      'default_mail_template.hbs',
    );
    if (!fs.existsSync(defaultMessageTemplatePath)) {
      this.logger.error(
        'Mail template not found: ',
        defaultMessageTemplatePath,
      );
      throw new InternalServerErrorException();
    }
    const rawMailText = `Message: ${context.message} ---- Data: ${context.raw_data} ---- at: ${context.timestamp}`;
    this.logger.log('sending mail to ' + receiver);
    return this.mailerService
      .sendMail({
        to: receiver,
        subject: context.subject,
        text: rawMailText,
        template: defaultMessageTemplatePath,
        context: context,
      })
      .then(() => this.logger.log('mail(s) successfully sent'))
      .catch((err) => {
        throw err;
      });
  }
}
