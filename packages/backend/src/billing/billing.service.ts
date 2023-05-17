import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor(private readonly userService: UsersService) {
    this.stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async getCheckoutUrl(priceId: string, userId: string) {
    const frontendUrl = process.env.FRONTEND_URL;

    const session = await this.stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],

      success_url: `${frontendUrl}/dashboard/profile/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/dashboard/profile/billing?canceled=true`,
      automatic_tax: { enabled: true },
      metadata: {
        userId,
      },
    });

    return session.url;
  }

  getStripeEvent(webhookSecret: string, signature: string, body: any) {
    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    return event;
  }

  async handleCheckoutCompleted(event: Stripe.Event) {
    const session = await this.stripe.checkout.sessions.retrieve(
      (event.data.object as any).id,
      {
        expand: ['line_items'],
      },
    );

    const userId = session.metadata.userId;
    const customerId = session.customer;

    const sessionId = session.id;
    const stripedCreatedAt = session.created;
    const stripeInvoiceId = session.invoice;
    const subscriptionId = session.subscription;

    // await this.userService.addPlan(userId, customerId,)
  }
}
