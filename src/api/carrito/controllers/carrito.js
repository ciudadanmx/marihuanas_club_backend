'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::carrito.carrito', ({ strapi }) => ({
  async clearCartByUserEmail(ctx) {
    try {
      const { email } = ctx.params;

      if (!email) {
        return ctx.badRequest('Email es requerido');
      }

      const carrito = await strapi.db.query('api::carrito.carrito').findOne({
        where: {
          usuario_email: email,
          estado: 'activo',
        },
      });

      if (!carrito) {
        return ctx.notFound('No se encontró un carrito activo para este usuario.');
      }

      await strapi.db.query('api::carrito.carrito').delete({
        where: { id: carrito.id },
      });

      ctx.send({ success: true });
    } catch (err) {
      ctx.internalServerError('Error al vaciar carrito', err);
    }
  },
}));
