'use strict';

module.exports = {
  async estado(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized('No autenticado');

    const membresia = await strapi.db.query('api::membresia.membresia').findOne({
      where: {
        usuario: user.id,
        fechaFin: { $gte: new Date() },
      },
      populate: ['usuario'],
      orderBy: { fechaFin: 'desc' },
    });

    if (!membresia) return ctx.send({ activo: false });

    return ctx.send({
      activo: true,
      tipo: membresia.tipo,
      fechaInicio: membresia.fechaInicio,
      fechaFin: membresia.fechaFin,
      usuario: {
        id: membresia.usuario.id,
        email: membresia.usuario.email,
      },
    });
  },
};
