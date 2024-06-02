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
  FlagCreationDTO,
  FlagCreationSchema,
  VariantCreationDTO,
  VariantSchema,
  VariantsSchema,
} from './flags.dto';
import { Variant } from './types';
import { Webhook, WebhookCreationDTO, WebhookSchema } from '../webhooks/types';
import { WebhooksService } from '../webhooks/webhooks.service';
import { post, WebhooksEventsToFlagStatus } from '../webhooks/utils';
import { ActivityLogService } from '../activity-log/activity-log.service';
import { UserId } from '../users/users.decorator';
import { FlagAlreadyExists } from '../projects/errors';
import { Timeframe, Timeframes } from '../events/types';

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

  @Put('/flags/:flagId')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  async changeFlagStatus(
    @UserId() userId: string,
    @Param('flagId') flagId: string,
    @Body() body: ActivateFlagDTO,
  ) {
    const status: FlagStatus | undefined = strToFlagStatus(body.status);

    if (!status) {
      throw new BadRequestException('Invalid status code');
    }

    const updatedFlag = await this.flagService.changeFlagStatus(flagId, status);

    this.wsGateway.notifyChanges(updatedFlag);

    for (const wh of updatedFlag.webhooks) {
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
      concernedEntity: 'flag',
      type: 'change-flag-status',
      data: JSON.stringify({ status }),
    });

    return updatedFlag;
  }

  @Delete('/flags/:flagId')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  deleteFlag(@Param('flagId') flagId: string) {
    return this.flagService.deleteFlag(flagId);
  }

  @Delete('/flags/:flagId/variants/:variantId')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  async deleteVariantFlag(
    @UserId() userId: string,
    @Param('flagId') flagId: string,
    @Param('variantId') variantId: string,
  ) {
    const variantDeleted = await this.flagService.deleteVariantFlag(variantId);

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      concernedEntity: 'flag',
      type: 'delete-variant',
      data: JSON.stringify(variantDeleted),
    });

    return variantDeleted;
  }

  /**
   * Get the flag hits grouped by date
   */
  @Get('/flags/:flagId/hits')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getFlagHits(
    @Param('flagId') flagId: string,
    @Query('timeframe') timeframe: string,
  ) {
    if (!Timeframes.includes(timeframe)) {
      throw new BadRequestException('timeframe is required.');
    }
    const tf = Number(timeframe) as Timeframe;

    const [hitsPerVariantPerDate, flagEvaluations] = await Promise.all([
      this.flagService.getFlagEvaluationsGroupedByDate(flagId, tf),
      this.flagService.flagEvaluations(flagId, tf),
    ]);

    return {
      hitsPerVariantPerDate,
      flagEvaluations,
    };
  }

  /**
   * Get the flag hits grouped by date
   */
  @Get('/flags/:flagId')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  getFlag(@Param('flagId') flagId: string) {
    return this.flagService.getFlagById(flagId);
  }

  @Get('/flags/:flagId/activity')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getActivity(@Param('flagId') flagId: string) {
    const activities = await this.flagService.listActivity(flagId);

    return activities.map((activity) => ({
      ...activity,
      data: activity.data ? JSON.parse(activity.data) : undefined,
    }));
  }

  @Post('/flags/:flagId/webhooks')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(WebhookSchema))
  async addWebhookToFlag(
    @UserId() userId: string,
    @Param('flagId') flagId: string,
    @Body() webhookDto: WebhookCreationDTO,
  ) {
    const webhook = await this.webhookService.addWebhookToFlag(
      flagId,
      webhookDto,
    );

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      concernedEntity: 'flag',
      type: 'create-webhook',
      data: JSON.stringify(webhook),
    });

    return webhook;
  }

  @Post('/flags/:flagId/variants')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(VariantSchema))
  async addVariantsToFlag(
    @UserId() userId: string,
    @Param('flagId') flagId: string,
    @Body() variantDto: VariantCreationDTO,
  ) {
    const variant = await this.flagService.createVariant(flagId, variantDto);

    await this.activityLogService.register({
      userId,
      flagId: flagId,

      concernedEntity: 'flag',
      type: 'create-variant',
      data: JSON.stringify(variant),
    });

    return variant;
  }

  @Put('/flags/:flagId/variants')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(VariantsSchema))
  async editVariantsOfFlag(
    @UserId() userId: string,
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

    const result = await this.flagService.editVariants(flagId, variantsDto);

    await this.activityLogService.register({
      userId,
      flagId: flagId,
      concernedEntity: 'flag',
      type: 'change-variants-percentage',
      data: JSON.stringify(variantsDto),
    });

    return result;
  }

  @Get('/flags/:flagId/webhooks')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  getWebhooks(@Param('flagId') flagId: string) {
    return this.webhookService.listWebhooks(flagId);
  }

  @Get('/flags/:flagId/variants')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  getVariants(@Param('flagId') flagId: string) {
    return this.flagService.listVariants(flagId);
  }

  @Put('/projects/:id/flags/:flagId')
  @UseGuards(HasFlagAccessGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(FlagCreationSchema))
  async editFlag(
    @Param('id') id,
    @Param('flagId') flagId,
    @Body() flag: FlagCreationDTO,
  ) {
    try {
      return await this.flagService.editFlag(
        id,
        flagId,
        flag.name,
        flag.description,
      );
    } catch (e) {
      if (e instanceof FlagAlreadyExists) {
        throw new BadRequestException('Flag already exists');
      }

      throw e;
    }
  }
}
