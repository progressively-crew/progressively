import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PaymentService } from './payment.service';
import { HasProjectAccessGuard } from '../projects/guards/hasProjectAccess';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/checkout/:id')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async createCheckoutSession(
    @Param('id') id: string,
    @Body() body: { count?: number },
  ) {
    if (!body.count) {
      throw new BadRequestException();
    }

    const session = await this.paymentService.createCheckoutSession(
      id,
      body.count,
    );

    return { clientSecret: session.client_secret };
  }

  @Get('/checkout/:id/session/:sessionId')
  @UseGuards(HasProjectAccessGuard)
  @UseGuards(JwtAuthGuard)
  async getSessionStatus(@Param('sessionId') sessionId: string) {
    const session = await this.paymentService.getSessionStatus(sessionId);

    return {
      status: session.status,
      customerEmail: session.customer_details.email,
    };
  }
}
