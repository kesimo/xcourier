import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsString,
  IsOptional,
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
  @IsOptional()
  base_url = '/';
  @IsString()
  @IsOptional()
  basic_auth_username?: string;
  @IsString()
  @IsOptional()
  basic_auth_password?: string;
  @IsString()
  @IsOptional()
  api_key?: string;
}
