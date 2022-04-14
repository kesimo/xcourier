import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsString,
} from 'class-validator';

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
