import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  Headers,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { SdkService } from './sdk.service';
import { EventHit } from './types';

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
  getByClientKey(
    @Param('params') base64Params: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @Headers() headers,
  ) {
    // User section, managing the user ID and cookies
    const cookieUserId = request?.cookies?.[COOKIE_KEY];
    const fields = this.sdkService.parseBase64Params(base64Params);

    fields.id = this.sdkService.resolveUserId(fields, cookieUserId);
    this._prepareCookie(response, fields.id);

    return this.sdkService.resolveSdkFlags(
      fields,
      headers['x-progressively-hit'] === 'skip',
    );
  }

  @Post('/:params')
  async hitEvent(
    @Param('params') base64Params: string,
    @Body() body: EventHit,
  ) {
    if (!body.name) {
      throw new BadRequestException();
    }

    const fields = this.sdkService.parseBase64Params(base64Params);

    if (!fields.clientKey) {
      throw new BadRequestException();
    }

    const eventCreated = await this.sdkService.hitEvent(
      fields.clientKey as string,
      body,
    );

    if (!eventCreated) {
      throw new BadRequestException();
    }

    return eventCreated;
  }
}
