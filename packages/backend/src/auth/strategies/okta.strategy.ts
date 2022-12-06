import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { UsersService } from '../../users/users.service';
import { OktaService } from '../okta.service';
import { AuthProviders } from '../types';

@Injectable()
export class OktaStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: OktaService,
    private readonly userService: UsersService,
  ) {
    super();
  }

  async validate(token: string) {
    try {
      const tokenMeta = await this.authService.validateToken(token);

      await this.userService.createUserFromProvider(
        tokenMeta.claims.uid,
        AuthProviders.Okta,
      );

      return tokenMeta;
    } catch (error) {
      return false;
    }
  }
}
