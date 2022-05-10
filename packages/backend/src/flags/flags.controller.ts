import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { nanoid } from 'nanoid';
import { EnvironmentsService } from '../environments/environments.service';
import { FlagStatus } from './flags.status';
import { StrategyService } from '../strategy/strategy.service';
import { FlagsService } from './flags.service';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { strToFlagStatus } from './utils';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { FieldRecord } from '../strategy/types';
import { Response, Request } from 'express';
import { HasEnvironmentAccessGuard } from '../environments/guards/hasEnvAccess';
import { StrategySchema, StrategyCreationDTO } from '../strategy/strategy.dto';
import { HasFlagAccessGuard } from './guards/hasFlagAccess';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ActivateFlagDTO } from './flags.dto';
import { FlagHitsRetrieveDTO } from './types';

@ApiBearerAuth()
@Controller()
export class FlagsController {
  constructor(
    private readonly envService: EnvironmentsService,
    private readonly strategyService: StrategyService,
    private readonly flagService: FlagsService,
    private readonly wsGateway: WebsocketGateway,
  ) {}

  /**
   * Update a flag on a given project/env (by project id AND env id AND flagId)
   */
  @Put('environments/:envId/flags/:flagId')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async changeFlagForEnvStatus(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() body: ActivateFlagDTO,
  ) {
    const status: FlagStatus | undefined = strToFlagStatus(body.status);

    if (!status) {
      throw new BadRequestException('Invalid status code');
    }

    const updatedFlagEnv = await this.envService.changeFlagForEnvStatus(
      envId,
      flagId,
      status,
    );

    this.wsGateway.notifyFlagChanging(updatedFlagEnv);

    return updatedFlagEnv;
  }

  /**
   * Delete a project by project/env/flag
   */
  @Delete('environments/:envId/flags/:flagId')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteFlag(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ) {
    return this.flagService.deleteFlag(envId, flagId);
  }

  /**
   * Get the flag values by client sdk key
   */
  @Get('sdk/:clientKey')
  async getByClientKey(
    @Param('clientKey') clientKey: string,
    @Query() fields: FieldRecord = {},
    @Res({ passthrough: true }) response: Response,
    @Req() request: Request,
  ) {
    const COOKIE_KEY = 'progressively-id';
    const userId = request?.cookies?.[COOKIE_KEY];
    const flagEnvs = await this.envService.getEnvironmentByClientKey(clientKey);
    const dictOfFlags = {};

    let realUserId;

    if (fields?.id) {
      // User exists, but initial request
      realUserId = fields.id;
    } else if (userId) {
      // User exists, subsequent requests
      realUserId = userId;
    } else {
      // first visit but anonymous
      realUserId = nanoid();
    }

    fields.id = realUserId;

    response.cookie(COOKIE_KEY, fields.id, {
      sameSite: 'lax',
      secure: true,
    });

    response.header('X-progressively-id', `${fields.id}`);
    response.header('Access-Control-Expose-Headers', 'X-progressively-id');

    // TODO: make sure to run these with Promise.all when confident enough
    for (const flagEnv of flagEnvs) {
      let flagStatus: boolean;

      if (flagEnv.status === FlagStatus.ACTIVATED) {
        flagStatus = await this.strategyService.resolveStrategies(
          flagEnv,
          flagEnv.strategies,
          fields,
        );
      } else {
        flagStatus = false;
      }

      dictOfFlags[flagEnv.flag.key] = flagStatus;

      this.flagService.hitFlag(
        flagEnv.environmentId,
        flagEnv.flagId,
        flagEnv.status as FlagStatus,
      );
    }

    return dictOfFlags;
  }

  /**
   * Get the flag hits grouped by date
   */
  @Get('environments/:envId/flags/:flagId/hits')
  @UseGuards(HasEnvironmentAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getFlagHits(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ): Promise<any> {
    const rawHits = await this.flagService.listFlagHits(envId, flagId);

    return rawHits;
  }

  @Post('environments/:envId/flags/:flagId/strategies')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(StrategySchema))
  async addStrategyToProject(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() strategyDto: StrategyCreationDTO,
  ): Promise<any> {
    return this.strategyService.addStrategyToFlagEnv(
      envId,
      flagId,
      strategyDto,
    );
  }

  @Get('environments/:envId/flags/:flagId/strategies')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getStrategies(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ): Promise<any> {
    return this.strategyService.listStrategies(envId, flagId);
  }
}
