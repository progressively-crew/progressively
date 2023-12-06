import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  Headers,
  UseGuards,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { minimatch } from 'minimatch';
import { SdkService } from './sdk.service';
import { parseBase64Params, prepareCookie, resolveUserId } from './utils';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { EventHit } from './types';
import { getDeviceInfo } from '../shared/utils/getDeviceInfo';
import { FieldRecord } from '../rule/types';

export const COOKIE_KEY = 'progressively-id';

@Controller('sdk')
export class SdkController {
  constructor(private readonly sdkService: SdkService) {}

  async _guardSdkEndpoint(request: Request, fields: FieldRecord) {
    const secretKey = request.headers['x-api-key'] as string | undefined;

    if (!secretKey && !fields.clientKey) {
      throw new UnauthorizedException();
    }

    const concernedEnv = await this.sdkService.getEnvByKeys(
      fields.clientKey ? String(fields.clientKey) : undefined,
      secretKey,
    );

    if (!concernedEnv) {
      throw new UnauthorizedException();
    }

    const domain = request.get('host');

    if (
      !secretKey &&
      fields.clientKey &&
      (!concernedEnv.domain || !minimatch(domain, concernedEnv.domain))
    ) {
      throw new UnauthorizedException();
    }

    return concernedEnv;
  }

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
    const concernedEnv = await this._guardSdkEndpoint(request, fields);

    const cookieUserId = request?.cookies?.[COOKIE_KEY];
    const shouldSkipHits = headers['x-progressively-hit'] === 'skip';

    fields.id = resolveUserId(fields, cookieUserId);
    prepareCookie(response, fields.id);

    return this.sdkService.computeFlags(concernedEnv, fields, shouldSkipHits);
  }

  @Get('/types/gen')
  @UseGuards(JwtAuthGuard)
  async getTypesDefinitions(@Req() request: Request) {
    const secretKey = request.headers['x-api-key'] as string | undefined;

    if (!secretKey) {
      throw new UnauthorizedException();
    }

    return this.sdkService.generateTypescriptTypes(secretKey);
  }

  @Post('/:params')
  async hitEvent(
    @Req() request: Request,
    @Param('params') base64Params: string,
    @Body() body: EventHit,
  ) {
    if (!body.name) {
      throw new BadRequestException();
    }

    const fields = parseBase64Params(base64Params);
    const concernedEnv = await this._guardSdkEndpoint(request, fields);

    const deviceInfo = getDeviceInfo(request);
    const eventCreated = await this.sdkService.hitEvent(
      concernedEnv.uuid,
      String(fields?.id || ''),
      {
        ...body,
        ...deviceInfo,
        url: body.url || 'Unknown URL',
        referer: body.referer,
      },
    );

    if (!eventCreated) {
      throw new BadRequestException();
    }

    return eventCreated;
  }
}
