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
  Header,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { SdkService } from './sdk.service';
import { EventHit } from './types';
import { parseBase64Params, prepareCookie, resolveUserId } from './utils';

export const COOKIE_KEY = 'progressively-id';

@Controller('sdk')
export class SdkController {
  constructor(private readonly sdkService: SdkService) {}

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
    const fields = parseBase64Params(base64Params);
    const cookieUserId = request?.cookies?.[COOKIE_KEY];
    const shouldSkipHits = headers['x-progressively-hit'] === 'skip';

    fields.id = resolveUserId(fields, cookieUserId);
    prepareCookie(response, fields.id);

    return this.sdkService.computeFlags(fields, shouldSkipHits);
  }

  /**
   * Get the flag values by client sdk key
   */
  @Get('/:params/progressively.js')
  @Header('Cache-Control', 'no-cache, no-store, must-revalidate')
  @Header('content-type', 'application/javascript')
  @Header('Cross-Origin-Resource-Policy', 'cross-origin')
  async getJavascriptScript(
    @Param('params') base64Params: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @Headers() headers,
  ): Promise<string> {
    const flags = await this.getByClientKey(
      base64Params,
      response,
      request,
      headers,
    );

    const str = `window.progressivelyFlags=${JSON.stringify(flags, null)};`;

    console.log('lol', str);

    return str;
  }

  @Post('/:params')
  async hitEvent(
    @Param('params') base64Params: string,
    @Body() body: EventHit,
  ) {
    if (!body.name) {
      throw new BadRequestException();
    }

    const fields = parseBase64Params(base64Params);

    if (!fields.clientKey) {
      throw new BadRequestException();
    }

    const eventCreated = await this.sdkService.hitEvent(
      fields.clientKey as string,
      String(fields?.id || ''),
      body,
    );

    if (!eventCreated) {
      throw new BadRequestException();
    }

    return eventCreated;
  }
}
