import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor() {
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

  async handleStripeWebhook(
    webhookSecret: string,
    signature: string,
    body: any,
  ) {
    const event = this.stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    let data = event.data;
    let eventType = event.type;

    switch (eventType) {
      case 'checkout.session.completed':
        const session = await this.stripe.checkout.sessions.retrieve(
          (event.data.object as any).id,
          {
            expand: ['line_items'],
          },
        );

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
      default:
      // Unhandled event type
    }
  }
}
