import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { getEnv } from './getEnv';
import { PrismaService } from '../database/prisma.service';
import { EventsPerCredits } from './constants';
import { ICachingService } from '../caching/types';
import { projectCreditsKey } from '../caching/keys';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private env: Record<string, string>;

  constructor(
    private readonly prisma: PrismaService,
    @Inject('CachingService') private readonly cachingService: ICachingService,
  ) {
    this.env = getEnv();
    this.stripe = new Stripe(this.env.PrivateStripeKey);
  }

  getEventUsage(projectUuid: string) {
    return this.prisma.eventUsage.findUnique({
      where: { projectUuid },
    });
  }

  async createCheckoutSession(
    projectId: string,
    userId: string,
    quantity: number,
  ) {
    return await this.stripe.checkout.sessions.create({
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
        userId,
        price: this.env.ProductId,
        quantity,
      },
    });
  }

  async orderSucceeded(session: Stripe.Checkout.Session) {
    const quantity = Number(session.metadata.quantity);
    const projectUuid = session.metadata.projectId;

    const [stripeOrder, project, eventUsage] = await this.prisma.$transaction([
      this.prisma.stripeOrder.updateMany({
        data: {
          status: 'paid',
        },
        where: {
          stripeSessionId: session.id,
        },
      }),
      this.prisma.project.update({
        where: { uuid: projectUuid },
        data: {
          credits: {
            increment: quantity,
          },
        },
      }),
      this.prisma.eventUsage.update({
        where: {
          projectUuid,
        },
        data: {
          eventsCount: {
            increment: quantity * EventsPerCredits,
          },
        },
      }),
    ]);

    const cachingKey = projectCreditsKey(projectUuid);
    await this.cachingService.set(cachingKey, eventUsage.eventsCount);

    return [stripeOrder, project, eventUsage];
  }

  orderFailed(session: Stripe.Checkout.Session) {
    return this.prisma.stripeOrder.updateMany({
      data: {
        status: 'failed',
      },
      where: {
        stripeSessionId: session.id,
      },
    });
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
        const projectUuid = session.metadata.projectId;
        const userUuid = session.metadata.userId;
        const itemId = session.metadata.price;
        const quantity = Number(session.metadata.quantity);

        // Save an order in your database, marked as 'awaiting payment'
        await this.prisma.stripeOrder.create({
          data: {
            stripeSessionId: session.id,
            itemId,
            quantity,
            total: quantity,
            projectUuid,
            userUuid,
            status: 'awaiting payment',
          },
        });

        // Check if the order is paid (for example, from a card payment)
        //
        // A delayed notification payment will have an `unpaid` status, as
        // you're still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === 'paid') {
          await this.orderSucceeded(session);
        }

        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object;

        // Fulfill the purchase...
        await this.orderSucceeded(session);

        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object;

        // Send an email to the customer asking them to retry their order
        await this.orderFailed(session);

        break;
      }
    }
  }

  async getProjectsCredit(projectUuid: string) {
    const cachingKey = projectCreditsKey(projectUuid);
    const eventsCount = await this.cachingService.get<number>(cachingKey);

    if (eventsCount !== null) {
      return eventsCount;
    }

    const eventUsageDb = await this.prisma.eventUsage.findUnique({
      where: {
        projectUuid,
      },
    });

    if (eventUsageDb) {
      await this.cachingService.set(cachingKey, eventUsageDb.eventsCount);
      return eventUsageDb.eventsCount;
    }

    return undefined;
  }

  async decreaseAvailableCreditsById(projectUuid: string, reduceBy: number) {
    try {
      const updated = await this.prisma.eventUsage.update({
        where: {
          projectUuid,
          eventsCount: {
            gt: 0,
          },
        },
        data: {
          eventsCount: { decrement: reduceBy },
        },
      });

      if (updated) {
        const cachingKey = projectCreditsKey(projectUuid);
        await this.cachingService.set(cachingKey, updated.eventsCount);
      }
    } catch {
      // Risky silent fail but it's acceptable as a starting point
      // otherwise calling prisma.update throws when it does not find the entry
      // to update
    }
  }
}
