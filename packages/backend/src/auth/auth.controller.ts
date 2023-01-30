import {
  Controller,
  Request,
  Post,
  UseGuards,
  BadRequestException,
  Body,
  UsePipes,
  Get,
  Param,
  UnauthorizedException,
  Res,
  Response,
  Req,
  NotFoundException,
} from '@nestjs/common';
import {
  Response as ExpressResponse,
  Request as ExpressRequest,
} from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { TokensService } from '../tokens/tokens.service';
import { UserRetrieveDTO } from '../users/users.dto';
import { UserStatus } from '../users/status';
import { UsersService } from '../users/users.service';
import { LoginDTO, RegistrationSchema, UserCreationDTO } from './types';
import { MailService } from '../mail/mail.service';
import { AuthService } from './auth.service';
import { CryptoService } from '../crypto/crypto.service';
import { User } from '../users/types';
import { sleep } from '../shared/utils/sleep';

const toB64 = (toTransform: string) =>
  Buffer.from(toTransform).toString('base64');

const fromB64 = (base64: string) =>
  Buffer.from(base64, 'base64').toString('ascii');

@Controller('auth')
export class AuthController {
  constructor(
    private tokensService: TokensService,
    private userService: UsersService,
    private readonly mailService: MailService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(
    @Request() req,
    @Res({ passthrough: true }) res: ExpressResponse,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    @Body() _: LoginDTO,
  ) {
    // Mitigate brute force
    await sleep();

    const user = req.user as User;

    const userDTO: UserRetrieveDTO = {
      uuid: user.uuid,
      email: user.email,
      fullname: user.fullname,
    };

    const accessToken = await this.tokensService.createAccessToken(
      userDTO,
      user.uuid,
    );

    const refreshToken = await this.tokensService.createRefreshToken({
      userId: user.uuid,
    });

    res.cookie('refresh-token', refreshToken, { httpOnly: true });

    return {
      access_token: accessToken,
    };
  }

  @Post('/register')
  @UsePipes(new ValidationPipe(RegistrationSchema))
  async register(@Body() userDto: UserCreationDTO): Promise<UserRetrieveDTO> {
    // Mitigate brute force
    await sleep();
    /**
     * When ALLOW_REGISTRATION is not activated, we still have to create an admin account.
     * Thus, we'll accept the only first user to be created that way
     */
    const alreadyHasUsers = await this.userService.hasUsers();

    if (process.env.ALLOW_REGISTRATION === 'true') {
      const existingUser = await this.userService.findByEmail(userDto.email);

      if (existingUser) {
        throw new BadRequestException('This email is already used.');
      }
    } else {
      if (alreadyHasUsers) {
        throw new NotFoundException();
      }
    }

    const rawToken = uuidv4();

    const activationToken = alreadyHasUsers
      ? CryptoService.sha256(rawToken)
      : null;

    const user: Omit<User, 'uuid'> = {
      fullname: userDto.fullname,
      password: userDto.password,
      email: userDto.email,
      activationToken,
      // Activate only the first user, then, every body is pending
      status: alreadyHasUsers ? UserStatus.Pending : UserStatus.Active,
    };

    const newUser = await this.userService.createUser(user);

    // Don't send activation email for the first user created
    if (alreadyHasUsers) {
      await this.mailService.sendRegistrationMail(
        userDto.fullname,
        userDto.email,
        toB64(rawToken),
      );
    }

    return {
      email: newUser.email,
      fullname: newUser.fullname,
      uuid: newUser.uuid,
    };
  }

  @Get('/activate/:token')
  async activateUser(
    @Param('token') rawToken: string,
    @Response() res,
  ): Promise<{ success: boolean }> {
    // Mitigate brute force
    await sleep();

    const updatedUser = await this.authService.activateUser(fromB64(rawToken));

    if (updatedUser) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/signin?userActivated=true`,
      );
    }

    throw new UnauthorizedException();
  }

  @Get('/refresh')
  async refreshToken(
    @Req() request: ExpressRequest,
    @Res({ passthrough: true }) res: ExpressResponse,
  ) {
    const refreshToken = request.cookies['refresh-token'];

    try {
      const { accessToken, nextRefreshToken } =
        await this.tokensService.refreshTokens(refreshToken);

      res.cookie('refresh-token', nextRefreshToken, { httpOnly: true });

      return {
        access_token: accessToken,
      };
    } catch (err) {
      return err;
    }
  }
}
