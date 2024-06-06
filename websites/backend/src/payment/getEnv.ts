export const getEnv = () => ({
  PrivateStripeKey: process.env.STRIPE_PRIVATE_KEY!,
  FrontendUrl: process.env.FRONTEND_URL!,
});
