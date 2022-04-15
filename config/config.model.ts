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

export enum EndpointType {
  query = 'query',
  json = 'json',
  blank = 'blank',
}
export class EndpointConfiguration {
  //used for endpoint identification (/:id)
  id: string;
  //type of data to receive and parse
  data_type: EndpointType;
  //list of all email recievers
  receivers: string[];
  //email subject
  subject: string;
  //path for custom handlebars template
  template_path?: string;
  //use if template should be defined in yaml configuration as string
  template?: string;
  //set to true if default template should be used (only shows timestamp, request id and raw body)
  default_template?: boolean;
  //send simple message with default styling
  message?: string;
  //custom history entry
  history_entry?: string;
  //auto retry after specified seconds
  retry?: number;
  //custom response status code for success
  response_code?: number;
}

export class Configuration {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => EmailConfiguration)
  email: EmailConfiguration;
}
