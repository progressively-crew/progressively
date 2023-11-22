import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { SdkService } from './sdk.service';
import { parseBase64Params, prepareCookie, resolveUserId } from './utils';

import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

export const COOKIE_KEY = 'progressively-id';

@Controller('sdk')
export class SdkController {
  constructor(private readonly sdkService: SdkService) {}

  /**
   * Get the flag values by client sdk key
   */
  @Get('/:params')
  async getByClientKey(
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
   * Get One  flag values by client sdk key
   */
  @Get('/:params/:flagKey')
  async getUniqueFlagByClientKey(
    @Param('params') base64Params: string,
    @Param('flagKey') flagKey: string,
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
    @Headers() headers,
  ) {
    const fields = parseBase64Params(base64Params);
    const cookieUserId = request?.cookies?.[COOKIE_KEY];
    const shouldSkipHits = headers['x-progressively-hit'] === 'skip';

    fields.id = resolveUserId(fields, cookieUserId);
    prepareCookie(response, fields.id);

    return this.sdkService.computeUniqueFlag(flagKey, fields, shouldSkipHits);
  }

  @Get('/:clientKey/types/gen')
  @UseGuards(JwtAuthGuard)
  async getTypesDefinitions(@Param('clientKey') clientKey: string) {
    return this.sdkService.generateTypescriptTypes(clientKey);
  }
}
