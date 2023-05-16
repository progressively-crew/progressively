import { Controller, UseGuards, Post, UsePipes, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { CheckoutCreationDTO, CheckoutCreationSchema } from './types';
import { BillingService } from './billing.service';

@Controller('')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Post('/checkout')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(CheckoutCreationSchema))
  async enterCheckoutFlow(@Body() checkoutDto: CheckoutCreationDTO) {
    try {
      const sessionUrl = await this.billingService.getCheckoutUrl(
        checkoutDto.priceId,
      );

      return { sessionUrl };
    } catch (err) {
      throw new Response('Something wrong happened. Please, try again');
    }
  }
}
