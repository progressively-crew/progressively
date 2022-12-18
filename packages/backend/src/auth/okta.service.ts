import { Injectable } from '@nestjs/common';
import * as OktaJwtVerifier from '@okta/jwt-verifier';
import { getEnvVars } from '../envVariable';
import { OktaConfig } from './types';

@Injectable()
export class OktaService {
  private oktaVerifier: OktaJwtVerifier | undefined;

  static getOktaConfig() {
    const env = getEnvVars();
    const oktaConfig: OktaConfig = {
      issuer: env.OktaIssuer,
      clientId: env.OktaClientId,
      isOktaActivated: Boolean(env.OktaIssuer && env.OktaClientId),
    };

    return oktaConfig;
  }

  constructor() {
    const config = OktaService.getOktaConfig();

    if (config.isOktaActivated) {
      this.oktaVerifier = new OktaJwtVerifier({
        issuer: config.issuer,
        clientId: config.clientId,
      });
    }
  }

  async validateToken(token: string): Promise<any> {
    const config = OktaService.getOktaConfig();

    if (!config.isOktaActivated) {
      throw new Error('Authentication type not suppored.');
    }

    return await this.oktaVerifier.verifyAccessToken(token, 'api://default');
  }
}
