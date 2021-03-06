import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifierModule } from './modules/notifier/notifier.module';
import configuration from './modules/configuration/configuration';
import serverConfiguration from 'src/modules/configuration/server-configuration';
import { MailTransmitterModule } from './modules/mail-transmitter/mail-transmitter.module';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { MailConfigService } from './modules/mail-transmitter/mail-config.service';
import { WinstonModule } from 'nest-winston/dist/winston.module';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { ConfigurationService } from './modules/configuration/configuration.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    WinstonModule.forRoot({
      //todo configure logging file path
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Xcourier', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: './xcourier.log',
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
      useClass: MailConfigService,
      inject: [ConfigurationService],
    }),
    NotifierModule,
    MailTransmitterModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
