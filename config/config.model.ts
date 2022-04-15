import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
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

export enum EndpointType {
  query = 'query',
  json = 'json',
  blank = 'blank',
}
export class EndpointConfiguration {
  //used for endpoint identification (/:id)
  @IsNotEmpty()
  @IsString()
  id: string;

  //type of data to receive and parse
  @IsNotEmpty()
  @IsEnum(EndpointType)
  data_type: EndpointType;

  //list of all email receivers
  @IsNotEmpty()
  @IsString({ each: true })
  receivers: string[];

  //email subject
  @IsString()
  subject: string;

  //path for custom handlebars template
  @IsString()
  template_path?: string;

  //use if template should be defined in yaml configuration as string
  @IsString()
  template?: string;

  //set to true if default template should be used (only shows timestamp, request id and raw body)
  @IsBoolean()
  default_template?: boolean;

  //send simple message with default styling
  @IsString()
  message?: string;

  //custom history entry
  @IsString()
  history_entry?: string;

  //auto retry after specified seconds
  //@future
  @IsNumber()
  retry?: number;

  //custom response status code for success
  @IsNumber()
  @Max(1000)
  response_code?: number;
}

export class Configuration {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => EmailConfiguration)
  email: EmailConfiguration;
  @IsDefined()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => EndpointConfiguration)
  endpoints: EndpointConfiguration[];
}
