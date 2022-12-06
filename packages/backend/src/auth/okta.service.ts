import { Injectable } from '@nestjs/common';
import * as OktaJwtVerifier from '@okta/jwt-verifier';
import { OktaConfig } from './types';

@Injectable()
export class OktaService {
  private oktaVerifier: OktaJwtVerifier | undefined;

  static getOktaConfig() {
    const oktaConfig: OktaConfig = {
      issuer: String(process.env.OKTA_ISSUER),
      clientId: String(process.env.OKTA_CLIENT_ID),
      isOktaActivated: Boolean(
        process.env.OKTA_ISSUER && process.env.OKTA_CLIENT_ID,
      ),
    };

    return oktaConfig;
  }

  constructor() {
    const config = OktaService.getOktaConfig();

    if (config.isOktaActivated) {
      this.oktaVerifier = new OktaJwtVerifier({
        issuer: process.env.OKTA_ISSUER,
        clientId: process.env.OKTA_CLIENT_ID,
      });
    }
  }

  async validateToken(token: string): Promise<any> {
    const config = OktaService.getOktaConfig();

    if (!config.isOktaActivated) {
      throw new Error('Authentication type not suppored.');
    }

    const jwt = await this.oktaVerifier.verifyAccessToken(
      token,
      'api://default',
    );

    return jwt;
  }
}
