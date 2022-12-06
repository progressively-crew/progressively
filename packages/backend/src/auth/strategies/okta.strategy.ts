import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { OktaService } from '../okta.service';

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: OktaService) {
    super();
  }

  async validate(token: string) {
    try {
      return await this.authService.validateToken(token);
    } catch (error) {
      return false;
    }
  }
}
