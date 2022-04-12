import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';
import * as Joi from 'joi';
import { validate } from 'config/config.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      //validate,
      /* validationSchema: Joi.object({
        server: Joi.object({
          debug: Joi.boolean().default(false),
          port: Joi.number().default(3000),
          base_url: Joi.string().default('/'),
          basic_auth_username: Joi.string(),
          basic_auth_password: Joi.string(),
          api_key: [Joi.string(), Joi.number()],
        }),
      }), */
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
