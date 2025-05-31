'use strict';

const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = process.env.CORS_ORIGIN;

module.exports = {
  async onboardingLink(ctx) {
    const { storeName, email } = ctx.request.body;

    console.log("➡️ Recibido en backend:", { storeName, email });

    if (!email || !storeName) {
      return ctx.badRequest('Faltan datos');
    }

    let account = null;
    let accountLinkUrl = null;

    const slugify = (text) =>
      text.toString().toLowerCase().trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");

    const storeSlug = slugify(storeName);
    const storeUrl = `https://ciudadan.org/tienda/${storeSlug}`;

    try {
      // 1. Crear cuenta en Stripe
      account = await stripe.accounts.create({
        type: 'express',
        country: 'MX',
        email,
        capabilities: {
          transfers: { requested: true }
        },
        business_profile: {
          name: storeName,
          url: storeUrl,
        },
      });

      console.log("✅ Cuenta Stripe creada:", account.id);

      // 2. Crear link de onboarding
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${YOUR_DOMAIN}/error`,
        return_url: `${YOUR_DOMAIN}/stripe-success/${storeSlug}`,
        type: 'account_onboarding',
      });

      accountLinkUrl = accountLink.url;

    } catch (err) {
      console.error("❌ Error con Stripe:", err.message);
      return ctx.internalServerError("Error al crear cuenta Stripe");
    }

    try {
      // 💥 BORRAR DUPLICADOS ANTES DE CREAR TIENDA
      const existingStores = await strapi.entityService.findMany('api::store.store', {
        filters: {
          $or: [
            { name: storeName },
            { email }
          ]
        }
      });

      for (const tienda of existingStores) {
        await strapi.entityService.delete('api::store.store', tienda.id);
        console.log(`🗑️ Tienda duplicada borrada (ID: ${tienda.id})`);
      }

      // 3. Guardar tienda en Strapi
      const newStore = await strapi.entityService.create('api::store.store', {
        data: {
          name: slugify(storeName),
          email,
          stripeAccountId: account.id,
          slug: slugify(storeName),
          stripeOnboarded: account.details_submitted,
          stripeChargesEnabled: account.charges_enabled,
          stripePayoutsEnabled: account.payouts_enabled,
              publishedAt: new Date().toISOString(), // ✅ Esto la publica automáticamente
          terminado: false,
        },
      });

      console.log("✅ Tienda guardada en Strapi:", newStore);

      ctx.send({
        url: accountLinkUrl,
        message: 'Cuenta Stripe iniciada. Completa tu onboarding.',
      });

    } catch (err) {
      console.error("❌ Error al guardar tienda en Strapi:", err);
      ctx.internalServerError('No se pudo guardar la tienda');
    }
  },
};
