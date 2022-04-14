import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifierModule } from './modules/notifier/notifier.module';
import configuration from '../config/configuration';
import serverConfiguration from 'config/server-configuration';
import { MailTransmitterModule } from './modules/mail-transmitter/mail-transmitter.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigService } from './modules/mail-transmitter/mail-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, serverConfiguration],
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    NotifierModule,
    MailTransmitterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
