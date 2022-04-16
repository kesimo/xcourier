import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.setGlobalPrefix(process.env.BASE_URL || '');
  app.enableCors({
    origin: '*',
    preflightContinue: false,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  });

  app.use(function (req, res, next) {
    res.header('x-powered-by', '');
    next();
  });

  await app.listen(process.env.PORT).then(() => {
    logger.log('Started listening on port ' + process.env.PORT);
    if (process.env.BASE_URL) {
      logger.log('Global prefix set to ' + process.env.BASE_URL);
    }
  });
}
bootstrap();
