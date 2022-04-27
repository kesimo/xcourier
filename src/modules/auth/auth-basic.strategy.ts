import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ConfigurationService } from '../configuration/configuration.service';
import { ServerConfiguration } from 'config/server-config.model';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  private serverConfiguration: ServerConfiguration;
  constructor(private readonly configurationService: ConfigurationService) {
    super({
      passReqToCallback: true,
    });
    this.serverConfiguration = configurationService.getServerConfiguration();
  }

  public validate = async (req, username, password): Promise<boolean> => {
    if (
      this.serverConfiguration.basic_auth_username === username &&
      this.serverConfiguration.basic_auth_password === password
    ) {
      return true;
    } else if (!this.serverConfiguration.basic_auth_username) {
      //todo get data from yaml
      return true;
    }
    throw new UnauthorizedException();
  };
}
