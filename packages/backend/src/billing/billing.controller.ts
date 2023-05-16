import {
  Controller,
  UseGuards,
  Post,
  UsePipes,
  Body,
  BadRequestException,
  Req,
  RawBodyRequest,
  Request,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { CheckoutCreationDTO, CheckoutCreationSchema } from './types';
import { BillingService } from './billing.service';
import { UserRetrieveDTO } from '../users/users.dto';

@Controller('')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('/checkout')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(CheckoutCreationSchema))
  async enterCheckoutFlow(
    @Request() req,
    @Body() checkoutDto: CheckoutCreationDTO,
  ) {
    const user: UserRetrieveDTO = req.user;
    try {
      const sessionUrl = await this.billingService.getCheckoutUrl(
        checkoutDto.priceId,
        user.uuid,
      );

      return { sessionUrl };
    } catch (err) {
      throw new Response('Something wrong happened. Please, try again');
    }
  }

  @Post('/checkout/webhook')
  async checkoutWebhook(@Req() req: RawBodyRequest<Request>) {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return new BadRequestException();
    }

    try {
      const signature = req.headers['stripe-signature'];

      this.billingService.handleStripeWebhook(
        webhookSecret,
        signature,
        req.rawBody,
      );
    } catch (err) {
      return new BadRequestException();
    }
  }
}
