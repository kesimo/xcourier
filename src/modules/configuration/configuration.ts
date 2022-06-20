import { Logger } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { Configuration } from './config.model';

const YAML_CONFIG_FILENAME = 'configuration';

export default () => {
  const logger: Logger = new Logger('ConfigLoader');
  let config = null;
  try {
    config = yaml.load(
      readFileSync(
        join(__dirname, '../../config', YAML_CONFIG_FILENAME + '.yaml'),
        'utf8',
      ),
    ) as Record<string, any>;
  } catch (e) {
    try {
      config = yaml.load(
        readFileSync(
          join(__dirname, '../../config', YAML_CONFIG_FILENAME + '.yml'),
          'utf8',
        ),
      ) as Record<string, any>;
    } catch (e) {
      Logger.error('Error while loading configuration file. Does it exist?');
      throw e;
    }
  }
  const validatedConfig = plainToInstance(Configuration, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error('Failed to load yaml configuration... \n' + errors);
  }
  return config;
};
