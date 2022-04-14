import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotifierModule } from './modules/notifier/notifier.module';
import configuration from '../config/configuration';
import serverConfiguration from 'config/server-configuration';

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
    NotifierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
