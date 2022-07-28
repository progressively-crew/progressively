import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
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

    response.header('Cache-Control', 'max-age=5, s-maxage=5');
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

    const flags = await this.sdkService.resolveSdkFlags(fields);

    return flags;
  }
}
