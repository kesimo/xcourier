import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { NotifierController } from './notifier.controller';
import { ConfigurationModule } from '../configuration/configuration.module';
import { MailTransmitterModule } from '../mail-transmitter/mail-transmitter.module';

@Module({
  imports: [ConfigurationModule, MailTransmitterModule],
  providers: [NotifierService],
  controllers: [NotifierController],
})
export class NotifierModule {}
