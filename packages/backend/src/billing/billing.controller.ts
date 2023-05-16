import {
  Controller,
  UseGuards,
  Post,
  UsePipes,
  Body,
  Res,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { CheckoutCreationDTO, CheckoutCreationSchema } from './types';
import { BillingService } from './billing.service';
import { Response } from 'express';

@Controller('')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}
  @Post('/checkout')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(CheckoutCreationSchema))
  async enterCheckoutFlow(
    @Res() res: Response,
    @Body() checkoutDto: CheckoutCreationDTO,
  ) {
    const sessionUrl = await this.billingService.getCheckoutUrl(
      checkoutDto.priceId,
    );

    return res.redirect(303, sessionUrl);
  }
}
