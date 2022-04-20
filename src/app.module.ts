import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifierModule } from './modules/notifier/notifier.module';
import configuration from '../config/configuration';
import serverConfiguration from 'config/server-configuration';
import { MailTransmitterModule } from './modules/mail-transmitter/mail-transmitter.module';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { MailConfigService } from './modules/mail-transmitter/mail-config.service';
import { WinstonModule } from 'nest-winston/dist/winston.module';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { ConfigurationService } from './modules/configuration/configuration.service';

@Module({
  imports: [
    WinstonModule.forRoot({
      // todo configure logging
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Notifier', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: './notifier.log',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Notifier', {
              prettyPrint: true,
            }),
            winston.format.uncolorize(),
          ),
        }),
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, serverConfiguration],
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigurationModule],
      // useFactory: (config: ConfigurationService) => {
      //   const mailConfigService = new MailConfigService(config);
      //   console.log(mailConfigService.createMailerOptions());
      //   return mailConfigService.createMailerOptions as MailerOptions;
      // },
      useClass: MailConfigService,
      inject: [ConfigurationService],
    }),
    NotifierModule,
    MailTransmitterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
