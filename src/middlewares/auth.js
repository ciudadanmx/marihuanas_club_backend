'use strict';

const jwksRsa = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const { get } = require('lodash');

// Configura el cliente JWKS con la URI para obtener las claves públicas
const client = jwksRsa({
  jwksUri: 'https://ciudadan.us.auth0.com/.well-known/jwks.json',
});

// Función para obtener la clave pública a partir del encabezado del token
const getKey = (header, callback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      console.error('Error obteniendo la clave:', err);
      callback(err);
    } else {
      callback(null, key.getPublicKey());
    }
  });
};

module.exports = {
  async estado(ctx) {
    // 1. Extrae el token del header o de la cookie
    const token =
      get(ctx.request.headers, 'authorization', '').replace('Bearer ', '') ||
      ctx.cookies.get('token');

    console.log('Token recibido en mi-membresia:', token);

    if (!token) {
      console.log('⚠️ [mi-membresia] No token provided');
      return ctx.unauthorized('No token provided');
    }

    // 2. Verifica el JWT usando JWKS
    let decoded;
    try {
      decoded = await new Promise((resolve, reject) => {
        jwt.verify(
          token,
          getKey,
          {
            audience: 'za265MeRdxMKuPqzdPSTL7lHL0yyg5bd',
            issuer: 'https://ciudadan.us.auth0.com/',
          },
          (err, decodedToken) => {
            if (err) {
              console.error('Error verificando el token:', err);
              reject(err);
            } else {
              resolve(decodedToken);
            }
          }
        );
      });
      console.log('✅ [mi-membresia] Usuario decodificado:', decoded);
    } catch (err) {
      console.error('❌ [mi-membresia] JWT Verification Failed:', err);
      return ctx.unauthorized('Invalid token');
    }

    // 3. Guarda la info del usuario en ctx.state.user
    ctx.state.user = decoded;

    // 4. Continúa con la lógica de búsqueda de membresía
    console.log('🔍 [mi-membresia] Entró a controller.estado');
    const userId = ctx.state.user.id; // O decoded.sub, según tu payload
    if (!userId) {
      console.log('⚠️ [mi-membresia] Usuario no autenticado después de decode');
      return ctx.unauthorized('No autenticado');
    }

    console.log(`🔍 [mi-membresia] Buscando membresía para user.id=${userId}`);
    const membresia = await strapi.db.query('api::membresia.membresia').findOne({
      where: {
        usuario: userId,
        fechaFin: { $gte: new Date() },
      },
      populate: ['usuario'],
      orderBy: { fechaFin: 'desc' },
    });

    if (!membresia) {
      console.log('ℹ️ [mi-membresia] No hay membresía activa');
      return ctx.send({ activo: false });
    }

    console.log('✅ [mi-membresia] Se encontró membresía activa:', membresia);
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
