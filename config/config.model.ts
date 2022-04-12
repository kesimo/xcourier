import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ServerConfiguration {
  @IsNotEmpty()
  @IsBoolean()
  debug: boolean;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(63000)
  port = 3000;
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
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  host: string;
  @IsNumber()
  @Min(1)
  @Max(63000)
  port: number;
  @IsNotEmpty()
  @IsBoolean()
  ignore_tls: boolean;
  @IsNotEmpty()
  @IsBoolean()
  secure: boolean;
  @IsNotEmpty()
  @IsBoolean()
  require_tls: boolean;
  @IsNotEmpty()
  @IsString()
  user: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  default_from: string;
  @IsNotEmpty()
  @IsString()
  default_name: string;
}

export class Configuration {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ServerConfiguration)
  server: ServerConfiguration;
  @ValidateNested()
  @Type(() => EmailConfiguration)
  email: EmailConfiguration;
}
