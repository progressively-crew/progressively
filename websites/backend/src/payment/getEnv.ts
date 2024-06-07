export const getEnv = () => ({
  PrivateStripeKey: process.env.STRIPE_PRIVATE_KEY!,
  FrontendUrl: process.env.FRONTEND_URL!,
  ProductId: process.env.STRIPE_PRODUCT_ID!,
  WebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
});
