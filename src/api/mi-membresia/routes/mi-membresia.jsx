module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/mi-membresia',
      handler: 'membresia.estado', // <-- Apunta al controller
      config: {
        policies: ['global::isAuthenticated'],
      },
    },
  ],
};
