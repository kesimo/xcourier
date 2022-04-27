import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigurationModule } from '../configuration/configuration.module';
import { BasicStrategy } from './auth-basic.strategy';

@Module({
  imports: [ConfigurationModule, PassportModule],
  providers: [BasicStrategy],
})
export class AuthModule {}
