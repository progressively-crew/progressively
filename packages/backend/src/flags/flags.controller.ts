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
import { FlagsService } from './flags.service';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { strToFlagStatus } from './utils';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { HasFlagAccessGuard } from './guards/hasFlagAccess';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { ApiBearerAuth } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import {
  ActivateFlagDTO,
  MetricSchema,
  VariantCreationDTO,
  VariantSchema,
  VariantsSchema,
} from './flags.dto';
import { HasFlagEnvAccessGuard } from './guards/hasFlagEnvAccess';
import { MetricDto, Variant } from './types';
import { Webhook, WebhookCreationDTO, WebhookSchema } from '../webhooks/types';
import { WebhooksService } from '../webhooks/webhooks.service';
import { post, WebhooksEventsToFlagStatus } from '../webhooks/utils';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { UserId } from '../users/users.decorator';

@ApiBearerAuth()
@Controller()
export class FlagsController {
  constructor(
    private readonly flagService: FlagsService,
    private readonly webhookService: WebhooksService,
    private readonly wsGateway: WebsocketGateway,
    private readonly activityLogService: ActivityLogService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  /**
   * Update a flag on a given project/env (by project id AND env id AND flagId)
   */
  @Put('environments/:envId/flags/:flagId')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  async changeFlagForEnvStatus(
    @UserId() userId: string,
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

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      concernedEntity: 'flag',
      type: 'change-flag-status',
      data: JSON.stringify({ status }),
    });

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
  async deleteVariantFlag(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Param('variantId') variantId: string,
  ) {
    const variantDeleted = await this.flagService.deleteVariantFlag(variantId);

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      concernedEntity: 'flag',
      type: 'delete-variant',
      data: JSON.stringify(variantDeleted),
    });

    return variantDeleted;
  }

  @Delete('environments/:envId/flags/:flagId/metrics/:metricId')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteMetricFlag(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Param('metricId') metricId: string,
  ) {
    const deletedMetric = await this.flagService.deleteMetricFlag(
      envId,
      flagId,
      metricId,
    );

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      concernedEntity: 'flag',
      type: 'delete-metric',
      data: JSON.stringify(deletedMetric),
    });

    return deletedMetric;
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
  ) {
    if (!endDate || !startDate) {
      throw new BadRequestException('startDate and endDate are required.');
    }
    const hitsPerVariantPerDate =
      await this.flagService.flagHitsPerVariantPerDate(
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

    const flagEvaluations = await this.flagService.flagEvaluations(
      envId,
      flagId,
      startDate,
      endDate,
    );

    return {
      hitsPerVariantPerDate,
      flagEvaluationsCount,
      metricsByVariantCount,
      flagEvaluations,
    };
  }

  @Get('environments/:envId/flags/:flagId/activity')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getActivity(
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
  ) {
    const activities = await this.flagService.listActivity(envId, flagId);
    return activities.map((activity) => ({
      ...activity,
      data: activity.data ? JSON.parse(activity.data) : undefined,
    }));
  }

  @Post('environments/:envId/flags/:flagId/webhooks')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(WebhookSchema))
  async addWebhookToFlagEnv(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() webhookDto: WebhookCreationDTO,
  ) {
    const webhook = await this.webhookService.addWebhookToFlagEnv(
      envId,
      flagId,
      webhookDto,
    );

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      concernedEntity: 'flag',
      type: 'create-webhook',
      data: JSON.stringify(webhook),
    });

    return webhook;
  }

  @Post('environments/:envId/flags/:flagId/metrics')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(MetricSchema))
  async addMetricToFlag(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() metricDto: MetricDto,
  ) {
    const metric = await this.flagService.addMetricToFlagEnv(
      envId,
      flagId,
      metricDto.name,
      metricDto.variantId,
    );

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      concernedEntity: 'flag',
      type: 'create-metric',
      data: JSON.stringify(metric),
    });

    return metric;
  }

  @Post('environments/:envId/flags/:flagId/variants')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(VariantSchema))
  async addVariantsToFlag(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() variantDto: VariantCreationDTO,
  ) {
    const variant = await this.flagService.createVariant(
      envId,
      flagId,
      variantDto,
    );

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      concernedEntity: 'flag',
      type: 'create-variant',
      data: JSON.stringify(variant),
    });

    return variant;
  }

  @Put('environments/:envId/flags/:flagId/variants')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(VariantsSchema))
  async editVariantsOfFlag(
    @UserId() userId: string,
    @Param('envId') envId: string,
    @Param('flagId') flagId: string,
    @Body() variantsDto: Array<Variant>,
  ) {
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

    const result = await this.flagService.editVariants(
      envId,
      flagId,
      variantsDto,
    );

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      envId: envId,
      concernedEntity: 'flag',
      type: 'change-variants-percentage',
      data: JSON.stringify(variantsDto),
    });

    return result;
  }

  @Get('environments/:envId/flags/:flagId/metrics')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getMetrics(@Param('envId') envId: string, @Param('flagId') flagId: string) {
    return this.flagService.listMetrics(envId, flagId);
  }

  @Get('environments/:envId/flags/:flagId/webhooks')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getWebhooks(@Param('envId') envId: string, @Param('flagId') flagId: string) {
    return this.webhookService.listWebhooks(envId, flagId);
  }

  @Get('environments/:envId/flags/:flagId/variants')
  @UseGuards(HasFlagEnvAccessGuard)
  @UseGuards(JwtAuthGuard)
  getVariants(@Param('envId') envId: string, @Param('flagId') flagId: string) {
    return this.flagService.listVariants(envId, flagId);
  }
}
