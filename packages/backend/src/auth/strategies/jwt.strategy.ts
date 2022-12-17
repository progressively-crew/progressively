import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { getEnvVars } from '../../envVariable';
import { UserRetrieveDTO } from '../../users/users.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getEnvVars().AccessTokenSecret,
    });
  }

  async validate(payload: any) {
    const user: UserRetrieveDTO = {
      uuid: payload.uuid,
      email: payload.email,
      fullname: payload.fullname,
    };

    return user;
  }
}
