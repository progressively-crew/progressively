import { User } from '@prisma/client';
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
import { RegistrationSchema, UserCreationDTO } from './types';
import { MailService } from '../mail/mail.service';
import { AuthService } from './auth.service';
import { CryptoService } from '../crypto/crypto.service';

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
  ) {
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
    const existingUser = await this.userService.findByEmail(userDto.email);

    if (existingUser) {
      throw new BadRequestException('This email is already used.');
    }

    const activationToken = uuidv4();

    const user: Omit<User, 'uuid'> = {
      fullname: userDto.fullname,
      password: userDto.password,
      email: userDto.email,
      activationToken: CryptoService.sha256(activationToken),
      status: UserStatus.Pending,
    };

    const newUser = await this.userService.createUser(user);

    await this.mailService.sendRegistrationMail(
      userDto.fullname,
      userDto.email,
      activationToken,
    );

    return {
      email: newUser.email,
      fullname: newUser.fullname,
      uuid: newUser.uuid,
    };
  }

  @Get('/activate/:token')
  async activateUser(
    @Param('token') rawToken: string,
    @Response() res: any,
  ): Promise<{ success: boolean }> {
    const updatedUser = await this.authService.activateUser(rawToken);

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
    const refreshToken: any = request.cookies['refresh-token'];

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
