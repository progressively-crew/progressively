import { Controller, Get, Param, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { FastifyRequest } from 'fastify';
import { FastifyReply } from 'fastify';
import { SdkService } from './sdk.service';

export const COOKIE_KEY = 'progressively-id';

@Controller()
export class SdkController {
  constructor(private readonly sdkService: SdkService) {}

  _prepareCookie(response: FastifyReply, userId: string) {
    response.setCookie(COOKIE_KEY, userId, {
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
      path: '/',
    });

    response.header('Cache-Control', 'max-age=5, s-maxage=5');
    response.header('X-progressively-id', userId);
    response.header('Access-Control-Expose-Headers', 'X-progressively-id');
  }

  /**
   * Get the flag values by client sdk key
   */
  @Get('sdk/:params')
  async getByClientKey(
    @Param('params') base64Params: string,
    @Res({ passthrough: true }) response: FastifyReply,
    @Req() request: FastifyRequest,
  ) {
    // User section, managing the user ID and cookies
    const cookieUserId = request.cookies?.[COOKIE_KEY];
    const fields = this.sdkService.parseBase64Params(base64Params);

    fields.id = this.sdkService.resolveUserId(fields, cookieUserId);
    this._prepareCookie(response, fields.id);

    const flags = await this.sdkService.resolveSdkFlags(fields);

    return flags;
  }
}
