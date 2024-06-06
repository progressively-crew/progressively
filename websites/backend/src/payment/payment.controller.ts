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

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/checkout/:id')
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
