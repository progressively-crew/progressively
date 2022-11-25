import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { FlagStatus } from './flags.status';
import { StrategyService } from '../strategy/strategy.service';
import { FlagsService } from './flags.service';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { strToFlagStatus } from './utils';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { StrategySchema, StrategyCreationDTO } from '../strategy/strategy.dto';
import { HasFlagAccessGuard } from './guards/hasFlagAccess';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  ActivateFlagDTO,
  ChangePercentageDTO,
  ChangePercentageSchema,
  MetricSchema,
  VariantCreationDTO,
  VariantSchema,
  VariantsSchema,
} from './flags.dto';
import { HasFlagEnvAccessGuard } from './guards/hasFlagEnvAccess';
import { SchedulingCreationDTO, SchedulingSchema } from '../scheduling/types';
import { SchedulingService } from '../scheduling/scheduling.service';
import { MetricDto, Variant } from './types';
import { Webhook, WebhookCreationDTO, WebhookSchema } from '../webhooks/types';
import { WebhooksService } from '../webhooks/webhooks.service';
import { post, WebhooksEventsToFlagStatus } from '../webhooks/utils';

import { EligibilityService } from '../eligibility/eligibility.service';
import {
  EligibilityCreationDTO,
  EligibilitySchema,
} from '../eligibility/types';

@ApiBearerAuth()
@Controller()
export class FlagsController {
  constructor(
    private readonly strategyService: StrategyService,
    private readonly schedulingService: SchedulingService,
    private readonly flagService: FlagsService,
    private readonly webhookService: WebhooksService,
    private readonly eligibilityService: EligibilityService,
    private readonly wsGateway: WebsocketGateway,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  /**
   * Update a flag on a given project/env (by project id AND env id AND flagId)
   */
  @Put('environments/:envId/flags/:flagId')
  @UseGuards(HasFlagEnvAccessGuard)
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

    const updatedFlagEnv = await this.flagService.changeFlagForEnvStatus(
      envId,
      flagId,
      status,
    );

    this.wsGateway.notifyChanges(
      updatedFlagEnv.environment.clientKey,
      updatedFlagEnv,
    );

    for (const wh of updatedFlagEnv.webhooks) {
      if (WebhooksEventsToFlagStatus[wh.event] === status) {
        try {
          await post(wh as Webhook);
        } catch (err) {
          this.logger.log({
            error: err.message,
            level: 'error',
            context: 'Webhooks',
            url: wh.endpoint,
          });
        }
      }
    }

    return updatedFlagEnv;
  }

  @Put('environments/:envId/flags/:flagId/percentage')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(ChangePercentageSchema))
  async adjustFlagPercentage(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() body: ChangePercentageDTO,
  ) {
    const updatedFlagEnv = await this.flagService.adjustFlagPercentage(
      envId,
      flagId,
      body.rolloutPercentage,
    );

    this.wsGateway.notifyChanges(
      updatedFlagEnv.environment.clientKey,
      updatedFlagEnv,
    );

    return updatedFlagEnv;
  }

  /**
   * Delete a project by project/env/flag
   */
  @Delete('/flags/:flagId')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteFlag(@Param('flagId') flagId: string) {
    return this.flagService.deleteFlag(flagId);
  }

  @Delete('environments/:envId/flags/:flagId/variants/:variantId')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteVariantFlag(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Param('variantId') variantId: string,
  ) {
    return this.flagService.deleteVariantFlag(envId, flagId, variantId);
  }

  @Delete('environments/:envId/flags/:flagId/metrics/:metricId')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteMetricFlag(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Param('metricId') metricId: string,
  ) {
    return this.flagService.deleteMetricFlag(envId, flagId, metricId);
  }

  /**
   * Get the flag hits grouped by date
   */
  @Get('environments/:envId/flags/:flagId/hits')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getFlagHits(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Query('startDate') startDate: string | undefined,
    @Query('endDate') endDate: string | undefined,
  ): Promise<any> {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }
    const hitsPerVariant = await this.flagService.flagHitsPerVariant(
      envId,
      flagId,
      startDate,
      endDate,
    );

    const flagEvaluationsCount = await this.flagService.flagEvaluationsCount(
      envId,
      flagId,
      startDate,
      endDate,
    );

    const metricsByVariantCount = await this.flagService.metricsByVariantCount(
      envId,
      flagId,
      startDate,
      endDate,
    );

    return { hitsPerVariant, flagEvaluationsCount, metricsByVariantCount };
  }

  @Post('environments/:envId/flags/:flagId/strategies')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(StrategySchema))
  async addStrategyToFlag(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() strategyDto: StrategyCreationDTO,
  ): Promise<any> {
    const strategy = await this.strategyService.addStrategyToFlagEnv(
      envId,
      flagId,
      strategyDto,
    );

    const { FlagEnvironment: flagEnv } =
      await this.strategyService.getStrategyFlagEnv(strategy.uuid);

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    return strategy;
  }

  @Post('environments/:envId/flags/:flagId/eligibilities')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(EligibilitySchema))
  async addEligibilityToFlag(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() eligibilityDto: EligibilityCreationDTO,
  ): Promise<any> {
    const eligibility = await this.eligibilityService.addEligibilityToFlagEnv(
      envId,
      flagId,
      eligibilityDto,
    );

    const { FlagEnvironment: flagEnv } =
      await this.eligibilityService.getEligibilityFlagEnv(eligibility.uuid);

    if (flagEnv.status === FlagStatus.ACTIVATED) {
      this.wsGateway.notifyChanges(flagEnv.environment.clientKey, flagEnv);
    }

    return eligibility;
  }

  @Post('environments/:envId/flags/:flagId/webhooks')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(WebhookSchema))
  addWebhookToFlagEnv(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() webhookDto: WebhookCreationDTO,
  ): Promise<any> {
    return this.webhookService.addWebhookToFlagEnv(envId, flagId, webhookDto);
  }

  @Post('environments/:envId/flags/:flagId/scheduling')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(SchedulingSchema))
  addSchedulingToFlag(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() schedulingDto: SchedulingCreationDTO,
  ): Promise<any> {
    return this.schedulingService.addSchedulingToFlagEnv(
      envId,
      flagId,
      schedulingDto,
    );
  }

  @Post('environments/:envId/flags/:flagId/metrics')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(MetricSchema))
  addMetricToFlag(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() metricDto: MetricDto,
  ): Promise<any> {
    return this.flagService.addMetricToFlagEnv(
      envId,
      flagId,
      metricDto.name,
      metricDto.variantId,
    );
  }

  @Post('environments/:envId/flags/:flagId/variants')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(VariantSchema))
  addVariantsToFlag(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() variantDto: VariantCreationDTO,
  ): Promise<any> {
    return this.flagService.createVariant(envId, flagId, variantDto);
  }

  @Put('environments/:envId/flags/:flagId/variants')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(VariantsSchema))
  editVariantsOfFlag(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() variantsDto: Array<Variant>,
  ): Promise<any> {
    let cumulative = 0;
    let hasControl = false;

    for (const variant of variantsDto) {
      if (variant.isControl) {
        hasControl = true;
      }

      cumulative += variant.rolloutPercentage;
    }

    if (cumulative > 100) {
      throw new BadRequestException(
        `The cumulated percentage of the variants is ${cumulative}% which is over 100%.`,
      );
    }

    if (!hasControl) {
      throw new BadRequestException(
        `There is no control variant found. You have to provide one.`,
      );
    }

    return this.flagService.editVariants(envId, flagId, variantsDto);
  }

  @Get('environments/:envId/flags/:flagId/strategies')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getStrategies(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ): Promise<any> {
    return this.strategyService.listStrategies(envId, flagId);
  }

  @Get('environments/:envId/flags/:flagId/eligibilities')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getEligibilities(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ): Promise<any> {
    return this.eligibilityService.listEligibilities(envId, flagId);
  }

  @Get('environments/:envId/flags/:flagId/metrics')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getMetrics(@Param('envId') envId: string, @Param('flagId') flagId: string) {
    return this.flagService.listMetrics(envId, flagId);
  }

  @Get('environments/:envId/flags/:flagId/scheduling')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getScheduling(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ): Promise<any> {
    return this.schedulingService.listScheduling(envId, flagId);
  }

  @Get('environments/:envId/flags/:flagId/webhooks')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getWebhooks(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ): Promise<any> {
    return this.webhookService.listWebhooks(envId, flagId);
  }

  @Get('environments/:envId/flags/:flagId/variants')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getVariants(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ): Promise<any> {
    return this.flagService.listVariants(envId, flagId);
  }
}
