import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Configuration,
  EmailConfiguration,
} from 'src/modules/configuration/config.model';
import { MailerService } from '@nestjs-modules/mailer';
import { join } from 'path';
import * as fs from 'fs';
import { ConfigurationService } from '../configuration/configuration.service';
import { DefaultContext } from './models/default-context.model';
import { CustomContext } from './models/custom-context.model';
import { MAIL_TEMPLATE_DIR } from 'src/constants';

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
      MAIL_TEMPLATE_DIR,
      'default_mail_template.hbs',
    );

    await this.checkFileExistSync(defaultMessageTemplatePath);

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

  async sendCustomMails(
    receiver: string[],
    context: CustomContext,
    data: any = null,
    templatePath?: string,
  ): Promise<any> {
    if (!templatePath.match(/.(hbs)$/i)) {
      templatePath = templatePath + '.hbs';
    }
    const customMessageTemplatePath = join(MAIL_TEMPLATE_DIR, templatePath);

    await this.checkFileExists(customMessageTemplatePath);

    const rawMailText = `Message: ${context.message} ---- Data: ${context.raw_data} ---- at: ${context.timestamp}`;
    //feature: check if variables from template are given; else place default value
    const fullfilledData = data;
    const transformedData = Object.assign(
      { internal: context }, //tonote: internal.raw_data, internal.timestamp, internal.subject, internal.message
      fullfilledData,
    );
    this.logger.log('sending mail to ' + receiver);
    return this.mailerService
      .sendMail({
        to: receiver,
        subject: context.subject,
        text: rawMailText,
        template: customMessageTemplatePath,
        context: transformedData,
      })
      .then(() => this.logger.log('mail(s) successfully sent'))
      .catch((err) => {
        throw err;
      });
  }

  //helpers
  async checkFileExists(filePath: string): Promise<any> {
    const fileIsAvaliable = await fs.promises
      .readFile(filePath)
      .then(() => true)
      .catch(() => false);
    if (!fileIsAvaliable) {
      this.logger.error('Mail template not found: ', filePath);
      throw new InternalServerErrorException();
    }
  }
  //for performance comparison only
  checkFileExistSync(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      this.logger.error('Mail template not found: ', filePath);
      throw new InternalServerErrorException();
    }
  }
}
