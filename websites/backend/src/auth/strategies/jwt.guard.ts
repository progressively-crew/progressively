import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OktaService } from '../okta.service';

const guards = OktaService.getOktaConfig().isOktaActivated
  ? ['bearer', 'jwt']
  : 'jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard(guards) {}
