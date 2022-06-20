import { Injectable, Logger } from '@nestjs/common';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigurationService } from '../configuration/configuration.service';
import { EmailConfiguration } from 'src/modules/configuration/config.model';
import { MAIL_TEMPLATE_DIR } from 'src/constants';
@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  mailConfigurations: EmailConfiguration;
  logger = new Logger(MailConfigService.name);
  //email configuration file with connection parameters from .yaml
  constructor(private readonly configurationService: ConfigurationService) {
    this.mailConfigurations = configurationService.getMailConfiguration();
  }
  createMailerOptions(): MailerOptions {
    let transportOptions = null;
    if (
      this.mailConfigurations.smtp_url &&
      this.mailConfigurations.smtp_url.length > 0
    ) {
      this.logger.log('loading SMTP configuration from url');
      transportOptions = this.mailConfigurations.smtp_url;
    } else {
      transportOptions = {
        host: this.mailConfigurations.host,
        port: this.mailConfigurations.port,
        ignoreTLS: this.mailConfigurations.ignore_tls,
        secure: this.mailConfigurations.secure,
        requireTLS: this.mailConfigurations.require_tls,
        auth: {
          user: this.mailConfigurations.user,
          pass: this.mailConfigurations.password,
        },
        debug: this.configurationService.getServerConfiguration().debug,
        logger: this.configurationService.getServerConfiguration().debug,
      };
    }
    return {
      //Mail provider connection options
      transport: transportOptions,
      defaults: {
        from: `"${this.mailConfigurations.default_name}" <${this.mailConfigurations.default_from}>`,
      },
      //load templates by path and apply handlebars adapter
      // (used for replace text and url in email template)
      template: {
        dir: MAIL_TEMPLATE_DIR,
        adapter: new HandlebarsAdapter(undefined, {
          inlineCssEnabled: true,
        }),
        options: {
          strict: true,
        },
      },
    } as MailerOptions;
  }
}
