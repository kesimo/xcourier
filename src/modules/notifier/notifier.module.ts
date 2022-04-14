import { Module } from '@nestjs/common';
import { NotifierService } from './notifier.service';
import { NotifierController } from './notifier.controller';

@Module({
  providers: [NotifierService],
  controllers: [NotifierController],
})
export class NotifierModule {}
