import {
  Controller,
  Get,
  Param,
  Req,
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

  _getRequestMetadata(request: Request) {
    const userAgent = request.headers['user-agent'] || '';
    const ip = request.ip;
    const domain = request.headers['origin'] || '';
    const secretKey = request.headers['x-api-key'] as string | undefined;
    const shouldSkipHit = request.headers['x-progressively-hit'] === 'skip';

    return { userAgent, ip, domain, secretKey, shouldSkipHit };
  }

  async _guardSdkEndpoint(request: Request, fields: FieldRecord) {
    const { secretKey, domain } = this._getRequestMetadata(request);

    if (!secretKey && !fields.clientKey) {
      throw new UnauthorizedException();
    }

    const concernedProject = await this.sdkService.getProjectByKeys({
      clientKey: fields.clientKey as string | undefined,
      secretKey,
    });

    if (!concernedProject) {
      throw new UnauthorizedException();
    }

    const isDomainInvalid = this.sdkService.isInvalidDomain(
      domain,
      concernedProject.domain,
      secretKey,
      fields.clientKey,
    );

    if (isDomainInvalid) {
      throw new UnauthorizedException();
    }

    return concernedProject;
  }

  @Get('/:params')
  async getByClientKey(
    @Param('params') base64Params: string,
    @Req() request: Request,
  ) {
    const fields = parseBase64Params(base64Params);
    const { userAgent, ip, shouldSkipHit } = this._getRequestMetadata(request);
    const concernedProject = await this._guardSdkEndpoint(request, fields);

    fields.id = resolveUserId(fields, userAgent, ip);

    return this.sdkService.computeFlags(
      concernedProject,
      fields,
      shouldSkipHit,
    );
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

    const { userAgent, ip, secretKey, domain } =
      this._getRequestMetadata(request);

    const visitorId = resolveUserId(fields, userAgent, ip);

    fields.id = visitorId;

    const concernedProject = await this._guardSdkEndpoint(request, fields);

    const session = await this.sdkService.getOrCreateSession(
      visitorId,
      concernedProject.uuid,
    );

    const deviceInfo = getDeviceInfo(request);

    const queuedEvents: Array<QueuedEventHit> = body
      .filter((ev) => Boolean(ev.name))
      .map((ev) => ({
        name: ev.name,
        os: deviceInfo.os,
        browser: deviceInfo.browser,
        clientKey: fields.clientKey ? String(fields.clientKey) : undefined,
        secretKey,
        domain,
        referer: ev.referer,
        url: parseUrl(ev.url).toString(),
        visitorId,
        data: ev.data,
        viewportHeight: ev.viewportHeight,
        viewportWidth: ev.viewportWidth,
        posX: ev.posX,
        posY: ev.posY,
        projectUuid: concernedProject.uuid,
        sessionUuid: session.uuid,
      }));

    await this.queuingService.send(KafkaTopics.AnalyticsHits, queuedEvents);

    return {};
  }

  @Get('/types/gen')
  @UseGuards(JwtAuthGuard)
  async getTypesDefinitions(@Req() request: Request) {
    const { secretKey } = this._getRequestMetadata(request);

    if (!secretKey) {
      throw new UnauthorizedException();
    }

    return this.sdkService.generateTypescriptTypes(secretKey);
  }
}
