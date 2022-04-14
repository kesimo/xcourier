import {
  IsBoolean,
  IsDefined,
  IsEmail,
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

export class EmailConfiguration {
  @IsString({
    message: 'Email host is invalid',
  })
  @IsNotEmpty({
    message: 'Email host is missing',
  })
  @IsUrl()
  host: string;
  @IsNumber(
    {},
    {
      message: 'Email port is not a number',
    },
  )
  @Min(1, {
    message: 'Email port is invalid',
  })
  @Max(63000, {
    message: 'Email port is invalid',
  })
  port: number;
  @IsNotEmpty({
    message: 'ignore_tls property is missing',
  })
  @IsBoolean({
    message: 'ignore_tls property is invalid',
  })
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
  @IsEmail()
  default_from: string;
  @IsNotEmpty()
  @IsString()
  default_name: string;
}

export class Configuration {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => EmailConfiguration)
  email: EmailConfiguration;
}
