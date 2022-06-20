import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ServerConfiguration } from './server-config.model';

export default () => {
  const serverConfigFromEnv = {
    port: parseInt(process.env.PORT, 10) || 3000,
    debug: process.env.DEBUG == 'true' ? true : false,
    url_prefix: process.env.URL_PREFIX || '/',
    basic_auth_username: process.env.BASIC_AUTH_USERNAME || null,
    basic_auth_password: process.env.BASIC_AUTH_PASSWORD || null,
    api_key: process.env.API_KEY || null,
  };

  const validatedConfig = plainToInstance(
    ServerConfiguration,
    serverConfigFromEnv,
    {
      enableImplicitConversion: true,
    },
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(
      'Failed to load server configurations from environment... \n' + errors,
    );
  }
  return { server: serverConfigFromEnv };
};
