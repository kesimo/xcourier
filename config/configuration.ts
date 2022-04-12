import { Logger } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { Configuration } from './config.model';

const YAML_CONFIG_FILENAME = 'config';

export default () => {
  const logger: Logger = new Logger('ConfigLoader');
  let config = null;
  try {
    config = yaml.load(
      readFileSync(join(__dirname, YAML_CONFIG_FILENAME + '.yaml'), 'utf8'),
    ) as Record<string, any>;
  } catch (e) {
    try {
      config = yaml.load(
        readFileSync(join(__dirname, YAML_CONFIG_FILENAME + '.yml'), 'utf8'),
      ) as Record<string, any>;
    } catch (e) {
      Logger.error('Error while loading configuration file. Does it exist?');
      throw e;
    }
  }
  const validatedConfig = plainToInstance(Configuration, config, {
    enableImplicitConversion: true,
  });
  //console.log(config);
  console.log('validatedConfig: ', validatedConfig);
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  console.log('errors: ', errors);

  if (errors.length > 0) {
    //todo change error type and logging to console
    console.log('validation errors: ', errors);
    throw new Error(errors.toString());
  }
  return config;
};
