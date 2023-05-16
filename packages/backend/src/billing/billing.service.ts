import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

// https://stripe.com/docs/billing/subscriptions/build-subscriptions?ui=checkout

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe('loool', {
      apiVersion: '2022-11-15',
    });
  }

  async getCheckoutUrl(priceId: string) {
    const frontendUrl = process.env.BACKEND_URL;

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
      cancel_url: `${frontendUrl}}/dashboard/profile/billing?canceled=true`,
      subscription_data: {
        trial_period_days: 14,
      },
      automatic_tax: { enabled: true },
    });

    return session.url;
  }
}
