module.exports = {
  routes: [
    {
      method: 'DELETE',
      path: '/carrito/clear/:email',
      handler: 'carrito.clearCartByUserEmail',
      config: {
        auth: false, // cámbialo a true si usas JWT
      },
    },
  ],
};
