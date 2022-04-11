import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config';

export default () => {
  const logger: Logger = new Logger('ConfigLoader');
  try {
    return yaml.load(
      readFileSync(join(__dirname, YAML_CONFIG_FILENAME + '.yaml'), 'utf8'),
    ) as Record<string, any>;
  } catch (e) {
    try {
      return yaml.load(
        readFileSync(join(__dirname, YAML_CONFIG_FILENAME + '.yml'), 'utf8'),
      ) as Record<string, any>;
    } catch (e) {
      Logger.error('Error while loading configuration file. Does it exist?');
      throw e;
    }
  }
};
