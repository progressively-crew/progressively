import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRetrieveDTO } from '../../users/users.dto';
import { UserStatus } from '../../users/status';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserRetrieveDTO> {
    const user = await this.userService.validateUser(username, password);

    if (!user || user.status === UserStatus.Pending) {
      throw new UnauthorizedException();
    }

    return {
      email: user.email,
      fullname: user.fullname,
      uuid: user.uuid,
    };
  }
}
