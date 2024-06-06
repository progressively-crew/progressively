import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getEnv } from './getEnv';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private env: Record<string, string>;

  constructor() {
    this.env = getEnv();
    this.stripe = new Stripe(this.env.PrivateStripeKey);
  }

  async createCheckoutSession(projectId: string, quantity: number) {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: this.env.ProductId,
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${this.env.FrontendUrl}/dashboard/projects/${projectId}/settings?checkoutSuccess=true`,
      cancel_url: `${this.env.FrontendUrl}/dashboard/projects/${projectId}/settings?checkoutCanceled=true`,
      automatic_tax: { enabled: true },
      metadata: {
        projectId,
      },
    });

    return session;
  }

  async fulfillOrder(payload: any, sig: string) {
    const event = await this.stripe.webhooks.constructEvent(
      payload,
      sig,
      this.env.WebhookSecret,
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const projectId = event.data.object.metadata.projectId;

        // Save an order in your database, marked as 'awaiting payment'
        // createOrder(session);

        // Check if the order is paid (for example, from a card payment)
        //
        // A delayed notification payment will have an `unpaid` status, as
        // you're still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === 'paid') {
          // fulfillOrder(session);
        }

        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object;

        // Fulfill the purchase...
        //   fulfillOrder(session);

        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object;

        // Send an email to the customer asking them to retry their order
        // emailCustomerAboutFailedPayment(session);

        break;
      }
    }
  }
}
