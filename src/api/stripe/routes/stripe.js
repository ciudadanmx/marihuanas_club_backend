module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/stripe/onboarding-link',
      handler: 'stripe.onboardingLink',
      config: {
        policies: [],
        auth: false, // o true si lo controlas con JWT
      },
    },
  ],
};
