import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import Stripe from 'stripe';

import { PrismaService } from '../database/prisma.service';
import { PriceIdToEvaluation } from '@progressively/shared';

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async getCheckoutUrl(priceId: string, userId: string) {
    const frontendUrl = process.env.FRONTEND_URL;
    const stripeUser = await this.prisma.stripeUser.findFirst({
      where: {
        userUuid: userId,
      },
    });

    const session = await this.stripe.checkout.sessions.create({
      customer: stripeUser?.customerId,
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
    const customerId = String(session.customer);

    const sessionId = session.id;
    const stripedCreatedAt = session.created;
    const stripeInvoiceId = String(session.invoice);
    const subscriptionId = String(session.subscription);

    const priceId = session.line_items.data[0].price.id;
    const evaluationCount = PriceIdToEvaluation[priceId];

    return this.prisma.$transaction([
      this.prisma.stripeUser.upsert({
        where: {
          customerId,
        },
        create: {
          customerId,
          userUuid: userId,
        },
        update: {
          customerId,
          userUuid: userId,
        },
      }),
      this.prisma.stripeTransaction.create({
        data: {
          customerId,
          sessionId,
          subscriptionId,
          stripedCreatedAt,
          stripeInvoiceId,
        },
      }),

      this.prisma.plan.create({
        data: {
          evaluationCount,
          userUuid: userId,
        },
      }),
    ]);
  }
}
