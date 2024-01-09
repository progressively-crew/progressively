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
import { EventHit, QueuedEventHit } from './types';
import { getDeviceInfo } from '../shared/utils/getDeviceInfo';
import { FieldRecord } from '../rule/types';

import { KafkaTopics } from '../queuing/topics';
import { IQueuingService } from '../queuing/types';
import { MakeQueuingService } from '../queuing/queuing.service.factory';

export const COOKIE_KEY = 'progressively-id';

@Controller('sdk')
export class SdkController {
  private queuingService: IQueuingService;
  constructor(private readonly sdkService: SdkService) {
    this.queuingService = MakeQueuingService();
  }

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

    const domain = request.headers['origin'] || '';

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

    const flags = await this.sdkService.computeFlags(
      concernedEnv,
      fields,
      shouldSkipHits,
    );

    return flags;
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
    @Res({ passthrough: true }) response: Response,
    @Param('params') base64Params: string,
    @Body() body: EventHit,
  ) {
    if (!body.name) {
      throw new BadRequestException();
    }

    const cookieUserId = request?.cookies?.[COOKIE_KEY];
    const fields = parseBase64Params(base64Params);
    fields.id = resolveUserId(fields, cookieUserId);
    prepareCookie(response, fields.id);

    const secretKey = request.headers['x-api-key'] as string | undefined;
    const clientKey = fields.clientKey;
    const domain = request.headers['origin'] || '';

    const deviceInfo = getDeviceInfo(request);

    const queuedEvent: QueuedEventHit = {
      name: body.name,
      os: deviceInfo.os,
      browser: deviceInfo.browser,
      clientKey: clientKey ? String(clientKey) : undefined,
      secretKey,
      domain,
      referer: body.referer,
      url: body.url,
      visitorId: String(fields?.id || ''),
      data: body.data,
    };

    await this.queuingService.send(KafkaTopics.AnalyticsHits, queuedEvent);

    return null;
  }
}
