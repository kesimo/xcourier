export interface IConfiguration {
  server: IServerConfiguration;
  email: IEmailConfiguration;
}

export interface IServerConfiguration {
  debug: boolean;
  port: number;
  base_url: string;
  basic_auth_username?: string;
  basic_auth_password?: string;
  api_key?: string;
}

export interface IEmailConfiguration {
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
