"use strict";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const priceIdMap = {
  mensual: process.env.STRIPE_PRICE_ID_MENSUAL,
  semestral: process.env.STRIPE_PRICE_ID_SEMESTRAL,
  anual: process.env.STRIPE_PRICE_ID_ANUAL,
};

module.exports = {
  async onboardingLink(ctx) {
    const { storeName, email } = ctx.request.body;

    console.log("➡️ Recibido en backend (onboardingLink):", { storeName, email });

    if (!email || !storeName) {
      return ctx.badRequest("Faltan datos");
    }

    let account = null;
    let accountLinkUrl = null;

    const slugify = (text) =>
      text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");

    const storeSlug = slugify(storeName);
    const storeUrl = `https://ciudadan.org/tienda/${storeSlug}`;

    try {
      // 1. Crear cuenta en Stripe
      account = await stripe.accounts.create({
        type: "express",
        country: "MX",
        email,
        capabilities: {
          transfers: { requested: true },
        },
        business_profile: {
          name: storeName,
          url: storeUrl,
        },
      });

      console.log("✅ Cuenta Stripe creada (onboardingLink):", account.id);

      // 2. Crear link de onboarding
      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${process.env.CORS_ORIGIN}/error`,
        return_url: `${process.env.CORS_ORIGIN}/stripe-success/${storeSlug}`,
        type: "account_onboarding",
      });

      accountLinkUrl = accountLink.url;
      console.log("🔗 URL de onboarding generada:", accountLinkUrl);
    } catch (err) {
      console.error("❌ Error con Stripe (onboardingLink):", err.message);
      return ctx.internalServerError("Error al crear cuenta Stripe");
    }

    try {
      // 💥 BORRAR DUPLICADOS ANTES DE CREAR TIENDA
      const existingStores = await strapi.entityService.findMany("api::store.store", {
        filters: {
          $or: [{ name: storeName }, { email }],
        },
      });

      for (const tienda of existingStores) {
        await strapi.entityService.delete("api::store.store", tienda.id);
        console.log(`🗑️ Tienda duplicada borrada (ID: ${tienda.id})`);
      }

      // 3. Guardar tienda en Strapi
      const newStore = await strapi.entityService.create("api::store.store", {
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
        message: "Cuenta Stripe iniciada. Completa tu onboarding.",
      });
    } catch (err) {
      console.error("❌ Error al guardar tienda en Strapi (onboardingLink):", err);
      ctx.internalServerError("No se pudo guardar la tienda");
    }
  },

  async createCheckout(ctx) {
    console.log("🔍 [createCheckout] Body recibido:", ctx.request.body);
    const { email, priceId } = ctx.request.body;
    if (!email || !priceId) {
      console.log("⚠️ [createCheckout] Falta email o priceId:", { email, priceId });
      return ctx.badRequest("Faltan email o priceId");
    }

    try {
      console.log(
        "🔄 [createCheckout] Creando sesión de Checkout (pago único) en Stripe con priceId:",
        priceId,
        "y email:",
        email
      );
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
        customer_email: email,
      });
      console.log("✅ [createCheckout] Sesión creada:", session.id);
      return ctx.send({ url: session.url });
    } catch (err) {
      console.error("❌ Error al crear Checkout Session (createCheckout):", err);
      return ctx.internalServerError("No se pudo iniciar el pago");
    }
  },

  async createSession(ctx) {
    console.log("🔍 [createSession] Body recibido:", ctx.request.body);
    const { email, plan } = ctx.request.body;

    if (!email || !plan) {
      console.log("⚠️ [createSession] Faltan parámetros: email o plan", { email, plan });
      return ctx.badRequest("Faltan parámetros: email o plan");
    }

    const priceId = priceIdMap[plan.toLowerCase()];
    if (!priceId) {
      console.log("⚠️ [createSession] Tipo de plan no válido:", plan);
      return ctx.badRequest("Tipo de plan no válido");
    }

    try {
      console.log(
        "🔄 [createSession] Creando sesión de suscripción en Stripe con priceId:",
        priceId,
        "y email:",
        email
      );
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        customer_email: email,
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      });
      console.log("✅ [createSession] Sesión de suscripción creada:", session.id);
      return ctx.send({ url: session.url });
    } catch (err) {
      console.error("❌ Error en Stripe (createSession):", err);
      return ctx.internalServerError("No se pudo crear la sesión");
    }
  },

  // 🎯 Webhook de Stripe para recibir eventos de Checkout y crear membresía
  async webhook(ctx) {
    const sig = ctx.request.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(ctx.request.body, sig, webhookSecret);
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed (webhook):", err.message);
      ctx.status = 400;
      return (ctx.body = `Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      console.log(
        "🎯 [webhook] Evento checkout.session.completed recibido. event.data.object.id:",
        event.data.object.id
      );

      // Recuperar sesión expandiendo los line_items para obtener el Price ID
      let sessionWithItems;
      try {
        sessionWithItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
          expand: ["line_items", "line_items.data.price"],
        });
      } catch (err) {
        console.error("❌ Error al recuperar sesión con line_items (webhook):", err.message);
        ctx.status = 500;
        return;
      }

      const lineItems = sessionWithItems.line_items.data;
      console.log("🔍 [webhook] lineItems:", lineItems);
      if (!lineItems || lineItems.length === 0) {
        console.warn("🚫 [webhook] No hay line_items en la sesión");
        ctx.status = 200;
        return;
      }

      const purchasedPriceId = lineItems[0].price.id;
      console.log("🔍 [webhook] Price ID comprado:", purchasedPriceId);

      // Mapear Price ID a plan
      let plan;
      if (purchasedPriceId === process.env.STRIPE_PRICE_ID_MENSUAL) {
        plan = "mensual";
      } else if (purchasedPriceId === process.env.STRIPE_PRICE_ID_SEMESTRAL) {
        plan = "semestral";
      } else if (purchasedPriceId === process.env.STRIPE_PRICE_ID_ANUAL) {
        plan = "anual";
      } else {
        console.warn("🚫 [webhook] Price ID no reconocido:", purchasedPriceId);
        ctx.status = 200;
        return;
      }
      console.log("🔍 [webhook] Plan mapeado:", plan);

      const email = sessionWithItems.customer_email;
      console.log("🔍 [webhook] customer_email:", email);
      if (!email) {
        console.warn("🚫 [webhook] No hay customer_email en la sesión");
        ctx.status = 200;
        return;
      }

      try {
        // Buscar al usuario por email
        const usuarios = await strapi.entityService.findMany("plugin::users-permissions.user", {
          filters: { email },
        });
        const usuario = usuarios?.[0];
        if (!usuario) {
          console.warn("❌ [webhook] Usuario no encontrado:", email);
          ctx.status = 200;
          return;
        }
        console.log("🔍 [webhook] Usuario encontrado (ID):", usuario.id);

        // Calcular fechas según plan
        const hoy = new Date();
        const fechaFin = new Date(hoy);
        if (plan === "mensual") fechaFin.setMonth(hoy.getMonth() + 1);
        else if (plan === "semestral") fechaFin.setMonth(hoy.getMonth() + 6);
        else if (plan === "anual") fechaFin.setFullYear(hoy.getFullYear() + 1);

        // Crear la membresía en Strapi
        const nuevaMembresia = await strapi.entityService.create("api::membresia.membresia", {
          data: {
            tipo: plan,
            fechaInicio: hoy.toISOString(),
            fechaFin: fechaFin.toISOString(),
            activa: true,
            usuario: usuario.id,
          },
        });
        console.log("✅ [webhook] Membresía creada:", nuevaMembresia);
      } catch (error) {
        console.error("❌ Error creando membresía (webhook):", error.message);
      }
    }

    ctx.status = 200;
    ctx.body = "ok";
  },
};
