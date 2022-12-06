import { Injectable } from '@nestjs/common';
import * as OktaJwtVerifier from '@okta/jwt-verifier';

@Injectable()
export class OktaService {
  private oktaVerifier: OktaJwtVerifier;

  constructor() {
    this.oktaVerifier = new OktaJwtVerifier({
      issuer: process.env.OKTA_ISSUER,
      clientId: process.env.OKTA_CLIENT_ID,
    });
  }

  async validateToken(token: string): Promise<any> {
    const jwt = await this.oktaVerifier.verifyAccessToken(token, [
      'openid',
      'profile',
      'email',
    ]);

    return jwt;
  }
}
