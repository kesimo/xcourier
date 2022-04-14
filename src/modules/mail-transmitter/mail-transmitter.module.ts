import { Module } from '@nestjs/common';
import { MailTransmitterService } from './mail-transmitter.service';

@Module({
  providers: [MailTransmitterService]
})
export class MailTransmitterModule {}
