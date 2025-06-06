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
  {
    name: 'global::raw-body',
    config: {},
  },
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
