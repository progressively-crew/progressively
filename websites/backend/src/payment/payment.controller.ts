import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  RawBodyRequest,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';

import { PaymentService } from './payment.service';
import { HasProjectAccessGuard } from '../projects/guards/hasProjectAccess';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { UserId } from '../users/users.decorator';
import { UserRoles } from '../users/roles';
import { Roles } from '../shared/decorators/Roles';
import { EventsPerCredits } from './constants';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':id/checkout')
  @Roles(UserRoles.Admin)
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(
    @Param('id') id: string,
    @UserId() userId: string,
    @Body() body: { count?: number },
  ) {
    if (!body.count) {
      throw new BadRequestException();
    }

    const session = await this.paymentService.createCheckoutSession(
      id,
      userId,
      body.count,
    );

    return { sessionUrl: session.url };
  }

  @Get(':id/usage')
  @Roles(UserRoles.Admin)
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getEventUsage(@Param('id') id: string) {
    const usage = await this.paymentService.getEventUsage(id);

    return { ...usage, eventsPerCredits: EventsPerCredits };
  }

  @Post('/webhooks')
  async handleWebhooks(@Request() req: RawBodyRequest<Request>) {
    try {
      const sig = req.headers['stripe-signature'];
      await this.paymentService.fulfillOrder(req.rawBody, sig);
      return null;
    } catch (err) {
      console.log('lol', err);
      throw new BadRequestException();
    }
  }
}
