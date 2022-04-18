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
  @IsOptional()
  @IsBoolean()
  use_smtp?: boolean;
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
  @IsOptional()
  @IsString()
  subject: string;

  //path for custom handlebars template
  @IsString()
  @IsOptional()
  template_path?: string;

  //use if template should be defined in yaml configuration as string
  @IsString()
  @IsOptional()
  template?: string;

  //set to true if default template should be used (only shows timestamp, request id and raw body)
  @IsBoolean()
  @IsOptional()
  default_template?: boolean;

  //send simple message with default styling
  @IsString()
  @IsOptional()
  message?: string;

  //custom history entry
  @IsString()
  @IsOptional()
  history_entry?: string;

  //auto retry after specified seconds
  //@future
  @IsNumber()
  @IsOptional()
  retry?: number;

  //custom response status code for success
  @IsNumber()
  @Max(1000)
  @IsOptional()
  response_code?: number;

  @IsString()
  @IsOptional()
  linked_url?: string;

  @IsString()
  @IsOptional()
  linked_url_tag?: string;
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
