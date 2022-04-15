import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { NotifierController } from './notifier.controller';
import { ConfigurationModule } from '../configuration/configuration.module';

@Module({
  imports: [ConfigurationModule],
  providers: [NotifierService],
  controllers: [NotifierController],
})
export class NotifierModule {}
