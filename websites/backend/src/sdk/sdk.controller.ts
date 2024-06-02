import {
  Controller,
  Get,
  Param,
  Req,
  Headers,
  UseGuards,
  Post,
  Body,
  BadRequestException,
  UnauthorizedException,
  Inject,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { SdkService } from './sdk.service';
import { parseBase64Params, parseUrl, resolveUserId } from './utils';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { EventHit, QueuedEventHit } from './types';
import { getDeviceInfo } from '../shared/utils/getDeviceInfo';
import { FieldRecord } from '../rule/types';
import { KafkaTopics } from '../queuing/topics';
import { IQueuingService } from '../queuing/types';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { SdkHitAnalyticsSchema } from './sdk.dto';

@Controller('sdk')
export class SdkController {
  constructor(
    private readonly sdkService: SdkService,
    @Inject('QueueingService') private readonly queuingService: IQueuingService,
  ) {}

  async _guardSdkEndpoint(request: Request, fields: FieldRecord) {
    const secretKey = request.headers['x-api-key'] as string | undefined;

    if (!secretKey && !fields.clientKey) {
      throw new UnauthorizedException();
    }

    const concernedProject = await this.sdkService.getProjectByKeys(
      fields.clientKey ? String(fields.clientKey) : undefined,
      secretKey,
    );

    if (!concernedProject) {
      throw new UnauthorizedException();
    }

    const domain = request.headers['origin'] || '';

    if (
      !secretKey &&
      fields.clientKey &&
      (!concernedProject.domain ||
        (concernedProject.domain !== '**' &&
          !domain.includes(concernedProject.domain)))
    ) {
      throw new UnauthorizedException();
    }

    return concernedProject;
  }

  /**
   * Get the flag values by client sdk key
   */
  @Get('/:params')
  async getByClientKey(
    @Param('params') base64Params: string,
    @Req() request: Request,
    @Headers() headers,
  ) {
    const fields = parseBase64Params(base64Params);
    const userAgent = request.headers['user-agent'] || '';
    const ip = request.ip;
    const shouldSkipHits = headers['x-progressively-hit'] === 'skip';

    fields.id = resolveUserId(fields, userAgent, ip);

    const concernedProject = await this._guardSdkEndpoint(request, fields);

    const flags = await this.sdkService.computeFlags(
      base64Params,
      concernedProject,
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
  @UsePipes(new ValidationPipe(SdkHitAnalyticsSchema))
  async hitEvent(
    @Req() request: Request,
    @Param('params') base64Params: string,
    @Body() body: Array<EventHit>,
  ) {
    if (body.length === 0) {
      throw new BadRequestException();
    }

    const fields = parseBase64Params(base64Params);
    const userAgent = request.headers['user-agent'] || '';
    const ip = request.ip;

    fields.id = resolveUserId(fields, userAgent, ip);

    const secretKey = request.headers['x-api-key'] as string | undefined;
    const clientKey = fields.clientKey;
    const domain = request.headers['origin'] || '';

    const deviceInfo = getDeviceInfo(request);

    const queuedEvents: Array<QueuedEventHit> = body
      .filter((ev) => Boolean(ev.name))
      .map((ev) => ({
        name: ev.name,
        os: deviceInfo.os,
        browser: deviceInfo.browser,
        clientKey: clientKey ? String(clientKey) : undefined,
        secretKey,
        domain,
        referer: ev.referer,
        url: parseUrl(ev.url).toString(),
        visitorId: String(fields?.id || ''),
        data: ev.data,
        viewportHeight: ev.viewportHeight,
        viewportWidth: ev.viewportWidth,
        posX: ev.posX,
        posY: ev.posY,
      }));

    await this.queuingService.send(KafkaTopics.AnalyticsHits, queuedEvents);

    return {};
  }
}
