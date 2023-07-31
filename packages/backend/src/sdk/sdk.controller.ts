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
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { SdkService } from './sdk.service';
import { EventHit } from './types';
import { parseBase64Params, prepareCookie, resolveUserId } from './utils';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

export const COOKIE_KEY = 'progressively-id';

@Controller('sdk')
export class SdkController {
  constructor(
    private readonly sdkService: SdkService,
    private readonly userService: UsersService,
  ) {}

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
    const isSaas = process.env.IS_SAAS === 'true';
    const fields = parseBase64Params(base64Params);

    const clientKey = String(fields.clientKey);
    const cookieUserId = request?.cookies?.[COOKIE_KEY];
    const shouldSkipHits = headers['x-progressively-hit'] === 'skip';

    fields.id = resolveUserId(fields, cookieUserId);
    prepareCookie(response, fields.id);

    if (isSaas) {
      const isPlanValid = await this.userService.isPlanValid(clientKey);

      if (isPlanValid) {
        return this.sdkService.computeFlags(fields, shouldSkipHits);
      }

      return {};
    }

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
    const isSaas = process.env.IS_SAAS === 'true';
    const fields = parseBase64Params(base64Params);

    const clientKey = String(fields.clientKey);
    const cookieUserId = request?.cookies?.[COOKIE_KEY];
    const shouldSkipHits = headers['x-progressively-hit'] === 'skip';

    fields.id = resolveUserId(fields, cookieUserId);
    prepareCookie(response, fields.id);

    if (isSaas) {
      const isPlanValid = await this.userService.isPlanValid(clientKey);

      if (isPlanValid) {
        return this.sdkService.computeUniqueFlag(
          flagKey,
          fields,
          shouldSkipHits,
        );
      }

      return {};
    }

    return this.sdkService.computeUniqueFlag(flagKey, fields, shouldSkipHits);
  }

  @Get('/:clientKey/types/gen')
  @UseGuards(JwtAuthGuard)
  async getTypesDefinitions(@Param('clientKey') clientKey: string) {
    const isSaas = process.env.IS_SAAS === 'true';

    if (isSaas) {
      const isPlanValid = await this.userService.isPlanValid(clientKey);

      if (!isPlanValid) return ``;
    }

    return this.sdkService.generateTypescriptTypes(clientKey);
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

    const isSaas = process.env.IS_SAAS === 'true';

    if (isSaas) {
      const isPlanValid = await this.userService.isPlanValid(
        String(fields.clientKey),
      );

      if (!isPlanValid) {
        throw new BadRequestException();
      }
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
