import { Module } from '@nestjs/common';
import { ConfigurationModule } from '../configuration/configuration.module';
import { MailTransmitterService } from './mail-transmitter.service';

@Module({
  imports: [ConfigurationModule],
  providers: [MailTransmitterService],
  exports: [MailTransmitterService],
})
export class MailTransmitterModule {}
