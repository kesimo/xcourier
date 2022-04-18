import { Module } from '@nestjs/common';
import { MailTransmitterService } from './mail-transmitter.service';

@Module({
  providers: [MailTransmitterService],
  exports: [MailTransmitterService],
})
export class MailTransmitterModule {}
