import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../database/prisma.service';
import { PriceIdToEvaluation } from '@progressively/shared';
import { PlanStatus } from './types';
import { StripeUser } from '@progressively/database';

@Injectable()
export class BillingService {
  private stripe: Stripe;

  constructor(private readonly prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  getStripeUser(userId: string) {
    return this.prisma.stripeUser.findFirst({
      where: {
        userUuid: userId,
      },
    });
  }

  async getUserCurrentSubscription(stripeUser: StripeUser) {
    const existingSubscription = await this.prisma.stripeTransaction.findFirst({
      where: {
        customerId: stripeUser?.customerId,
      },
    });

    return existingSubscription;
  }

  async updateSubscription(priceId: string, stripeUser: StripeUser) {
    const existingSubscription = await this.prisma.stripeTransaction.findFirst({
      where: {
        customerId: stripeUser?.customerId,
      },
    });

    // Update instead of create
    if (existingSubscription) {
      const subscription = await this.stripe.subscriptions.retrieve(
        existingSubscription.subscriptionId,
      );

      const previousItemId = subscription.items.data[0].id;

      const updatedSubscription = await this.stripe.subscriptions.update(
        subscription.id,
        {
          cancel_at_period_end: false,
          proration_behavior: 'create_prorations',
          items: [
            {
              id: previousItemId,
              deleted: true,
            },
            {
              price: priceId,
              quantity: 1,
            },
          ],
        },
      );

      const evaluationCount = PriceIdToEvaluation[priceId];

      return this.prisma.$transaction([
        this.prisma.plan.updateMany({
          data: {
            status: PlanStatus.INACTIVE,
          },
          where: {
            userUuid: stripeUser.userUuid,
          },
        }),
        this.prisma.plan.create({
          data: {
            evaluationCount,
            userUuid: stripeUser.userUuid,
            status: PlanStatus.ACTIVE,
          },
        }),
      ]);
    }
  }

  async getCheckoutUrl(priceId: string, userId: string, customerId?: string) {
    const frontendUrl = process.env.FRONTEND_URL;

    const session = await this.stripe.checkout.sessions.create({
      customer: customerId,
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

  async handleSubscriptionCancellation(event: Stripe.Event) {
    const customerId = (event.data.object as any).customer;
    const associatedUser = await this.prisma.stripeUser.findFirst({
      where: {
        customerId,
      },
    });

    return this.prisma.plan.updateMany({
      where: {
        userUuid: associatedUser.userUuid,
      },
      data: {
        status: PlanStatus.INACTIVE,
      },
    });
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
      this.prisma.plan.updateMany({
        data: {
          status: PlanStatus.INACTIVE,
        },
        where: {
          userUuid: userId,
        },
      }),
      this.prisma.plan.create({
        data: {
          evaluationCount,
          userUuid: userId,
          status: PlanStatus.ACTIVE,
        },
      }),
    ]);
  }
}
