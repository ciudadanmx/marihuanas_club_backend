// path: src/api/auth/controllers/auth.js

'use strict';

const axios = require('axios');
const jwt = require('jsonwebtoken');

module.exports = {
  async auth0Login(ctx) {
    try {
      const { access_token } = ctx.request.body;
      console.log('🔑 access_token recibido:', access_token);

      if (!access_token) {
        return ctx.badRequest('Missing access token');
      }

      // Obtener información del usuario desde Auth0
      const auth0User = await axios.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const { email, sub: auth0Id } = auth0User.data;
      console.log('📧 Email desde Auth0:', email);
      console.log('🆔 Auth0 sub:', auth0Id);

      if (!email) {
        return ctx.badRequest('No email returned by Auth0');
      }

      // Buscar si el usuario ya existe
      const existingUsers = await strapi.entityService.findMany('plugin::users-permissions.user', {
        filters: { email },
        populate: ['role'],
      });

      let user = existingUsers[0];

      if (!user) {
        console.log('🆕 Usuario no existe. Creando nuevo usuario...');

        // Obtener el rol por defecto
        const defaultRole = await strapi.query('plugin::users-permissions.role').findOne({
          where: { type: 'authenticated' },
        });

        if (!defaultRole) {
          throw new Error('No default authenticated role found');
        }

        // Crear usuario
        user = await strapi.entityService.create('plugin::users-permissions.user', {
          data: {
            email,
            username: email,
            provider: 'auth0',
            confirmed: true,
            role: defaultRole.id,
          },
        });

        console.log('✅ Usuario creado:', user);
      } else {
        console.log('👤 Usuario existente encontrado:', user.id);
      }

      // Generar token JWT de Strapi
      const token = strapi.plugins['users-permissions'].services.jwt.issue({
        id: user.id,
      });

      ctx.send({
        jwt: token,
        user,
      });

    } catch (err) {
      console.error('❌ Error en auth0Login:', err);
      return ctx.unauthorized('Auth0 verification failed');
    }
  },
};
