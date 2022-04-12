import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateNested,
  validateSync,
} from 'class-validator';
import { plainToClass, Type } from 'class-transformer';

export class Configuration {
  //@ValidateNested()
  //@Type(() => ServerConfiguration)
  @IsNumber()
  server: string;
  //@ValidateNested()
  email: EmailConfiguration;
}

export class ServerConfiguration {
  @IsNotEmpty()
  @IsBoolean()
  debug: boolean;
  @IsNumber()
  @Min(1)
  @Max(63000)
  port: number;
  @IsString()
  base_url = '/';
  @IsString()
  basic_auth_username?: string;
  @IsString()
  basic_auth_password?: string;
  @IsString()
  api_key?: string;
}

export class EmailConfiguration {
  host: string;
  port: number;
  ignore_tls: boolean;
  secure: boolean;
  require_tls: boolean;
  user: string;
  password: string;
  default_from: string;
  default_name: string;
}

export function validate(config: Record<string, unknown>) {
  //console.log(config);
  const validatedConfig = plainToClass(Configuration, config, {
    enableImplicitConversion: true,
  });
  //console.log(config);
  console.log('validatedConfig: ', validatedConfig);
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: true,
  });
  console.log('errors: ', errors);

  if (errors.length > 0) {
    //todo change error type and logging to console
    console.log('validation errors: ', errors);
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
