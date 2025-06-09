// config/middlewares.js

module.exports = [
  'strapi::errors',
  {
    name: 'strapi::cors',
    config: {
      origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      credentials: true,
    },
  },
  'strapi::security',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',

  // Body parser configurado para peticiones grandes
  {
    name: 'strapi::body',
    config: {
      jsonLimit: '150mb',      // Límite para JSON
      formLimit: '150mb',      // Límite para urlencoded
      textLimit: '150mb',      // Límite para texto plano
      multipart: true,        // Habilita multipart/form-data
      parser: {
        enabled: true,
        multipart: true,
      },
      // Opcional: límites específicos de busboy para archivos
      busboyConfig: {
        limits: {
          fileSize: 100 * 1024 * 1024, // 100 MB por archivo
        },
      },
    },
  },

  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
