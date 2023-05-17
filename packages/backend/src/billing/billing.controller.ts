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
  Inject,
  Logger,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/strategies/jwt.guard';
import { ValidationPipe } from '../shared/pipes/ValidationPipe';
import { CheckoutCreationDTO, CheckoutCreationSchema } from './types';
import { BillingService } from './billing.service';
import { UserRetrieveDTO } from '../users/users.dto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('')
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @Post('/checkout')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(CheckoutCreationSchema))
  async enterCheckoutFlow(
    @Request() req,
    @Body() checkoutDto: CheckoutCreationDTO,
  ) {
    if (process.env.IS_SAAS !== 'true') return {};

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

      const event = this.billingService.getStripeEvent(
        webhookSecret,
        signature,
        req.rawBody,
      );

      switch (event.type) {
        case 'checkout.session.completed':
          await this.billingService.handleCheckoutCompleted(event);

          // Payment is successful and the subscription is created.
          // You should provision the subscription and save the customer ID to your database.
          break;
        case 'invoice.paid':
          // Continue to provision the subscription as payments continue to be made.
          // Store the status in your database and check when a user accesses your service.
          // This approach helps you avoid hitting rate limits.
          break;
        case 'invoice.payment_failed':
          // The payment failed or the customer does not have a valid payment method.
          // The subscription becomes past_due. Notify your customer and send them to the
          // customer portal to update their payment information.
          break;

        case 'customer.subscription.updated':
          const canceledAt = (event.data.object as any).canceled_at;

          if (canceledAt) {
            // cancel subscription
          }

          break;

        default:
        // Unhandled event type
      }
    } catch (err) {
      this.logger.error({
        error: err.message,
        level: 'error',
        context: 'Stripe',
      });

      return new BadRequestException();
    }
  }
}
