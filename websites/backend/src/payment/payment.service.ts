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
      ui_mode: 'embedded',
      line_items: [
        {
          price: 'price_1POaMoIIMJ2kplmTNKjQkTh3',
          quantity,
        },
      ],
      mode: 'payment',
      return_url: `${this.env.FrontendUrl}/dashboard/projects/${projectId}/settings?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
    });

    return session;
  }

  getSessionStatus(sessionId: string) {
    return this.stripe.checkout.sessions.retrieve(sessionId);
  }
}
