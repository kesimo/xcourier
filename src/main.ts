import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { DEFAULT_PORT } from './constants';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.setGlobalPrefix(process.env.URL_PREFIX || '');
  app.enableCors({
    origin: '*',
    preflightContinue: false,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  });

  app.use(function (req, res, next) {
    res.header('x-powered-by', '');
    next();
  });

  await app.listen(process.env.PORT || DEFAULT_PORT).then(() => {
    logger.log(
      'Started listening on port ' + (process.env.PORT || DEFAULT_PORT),
    );
    if (process.env.URL_PREFIX) {
      logger.log('Global prefix set to ' + process.env.URL_PREFIX);
    }
  });
}
bootstrap();
