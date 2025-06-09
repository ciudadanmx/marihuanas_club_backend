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

  // Body parser configurado para peticiones grandes y multipart
  {
    name: 'strapi::body',
    config: {
      // Límites para JSON / urlencoded / text
      jsonLimit: '200mb',    // cambia al valor que necesites
      formLimit: '200mb',
      textLimit: '200mb',
      // multipart/form-data (imágenes, etc.)
      multipart: true,
      formidable: {
        // tamaño máximo por archivo en bytes
        maxFileSize: 200 * 1024 * 1024, // 200 MB
      },
    },
  },

  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
