import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import * as Joi from 'joi';
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
      //envFilePath: ['.env.dev', '.env.dev.prod'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
