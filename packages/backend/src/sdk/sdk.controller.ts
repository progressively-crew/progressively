import { Controller, Get, Param, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { HasEnvironmentAccessGuard } from '../environments/guards/hasEnvAccess';
import { SdkService } from './sdk.service';

export const COOKIE_KEY = 'progressively-id';

@Controller('sdk')
export class SdkController {
  constructor(private readonly sdkService: SdkService) {}

  _prepareCookie(response: Response, userId: string) {
    response.cookie(COOKIE_KEY, userId, {
      sameSite: 'lax',
      secure: true,
    });

    response.header('X-progressively-id', userId);
    response.header('Access-Control-Expose-Headers', 'X-progressively-id');
  }

  /**
   * Get the flag values by client sdk key
   */
  @Get('/:params')
  async getByClientKey(
    @Param('params') base64Params: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    // User section, managing the user ID and cookies
    const cookieUserId = request?.cookies?.[COOKIE_KEY];
    const fields = this.sdkService.parseBase64Params(base64Params);

    fields.id = this.sdkService.resolveUserId(fields, cookieUserId);
    this._prepareCookie(response, fields.id);

    const { flags } = await this.sdkService.resolveSdkFlags(fields);

    return flags;
  }

  /**
   * Implementation should be almost the same GET /:params
   * The difference is that this endpoint should be behind the auth wall
   * with authorization, and allows to track the flag resolution
   * using the Flag console
   */
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/environments/:envId/:params')
  async debugFlagResolution(
    @Param('params') base64Params: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    // User section, managing the user ID and cookies
    const cookieUserId = request?.cookies?.[COOKIE_KEY];
    const fields = this.sdkService.parseBase64Params(base64Params);

    fields.id = this.sdkService.resolveUserId(fields, cookieUserId);
    this._prepareCookie(response, fields.id);

    return this.sdkService.resolveSdkFlags(fields);
  }
}
