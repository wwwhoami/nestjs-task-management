import { Injectable } from '@nestjs/common';
import { JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}

  createJwtOptions() {
    return {
      secret: this.configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: this.configService.get<number>('JWT_EXPIRATION'),
      },
    };
  }
}
