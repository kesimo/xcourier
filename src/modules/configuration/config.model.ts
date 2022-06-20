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
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EmailConfiguration {
  @IsOptional()
  @IsString()
  smtp_url?: string;

  @ValidateIf((o) => o.smtp_url === undefined)
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  host: string;

  @ValidateIf((o) => o.smtp_url === undefined)
  @IsNumber()
  @Min(1)
  @Max(63000)
  port: number;

  @ValidateIf((o) => o.smtp_url === undefined)
  @IsNotEmpty()
  @IsBoolean()
  ignore_tls: boolean;

  @ValidateIf((o) => o.smtp_url === undefined)
  @IsNotEmpty()
  @IsBoolean()
  secure: boolean;

  @ValidateIf((o) => o.smtp_url === undefined)
  @IsNotEmpty()
  @IsBoolean()
  require_tls: boolean;

  @ValidateIf((o) => o.smtp_url === undefined)
  @IsNotEmpty()
  @IsString()
  user: string;

  @ValidateIf((o) => o.smtp_url === undefined)
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

export enum PayloadType {
  preferQuery = 'prefer_query',
  preferJson = 'prefer_json',
  onlyQuery = 'only_query',
  onlyJson = 'only_json',
  onlyMessage = 'only_message',
}
export class EndpointConfiguration {
  //used for endpoint identification (/:id)
  @IsNotEmpty()
  @IsString()
  id: string;

  //type of data to receive and parse
  @IsOptional()
  @IsEnum(PayloadType)
  payload_type: PayloadType;

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

  //todo evaluate feature: use if template should be defined in yaml configuration as string
  /*
  @IsString()
  @IsOptional()
  template?: string;
  */

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

  @IsObject()
  @IsOptional()
  template_defaults: any;
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
