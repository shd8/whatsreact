const { Router } = require('express');
const productsController = require('../controllers/productsController')();

function productsRouter() {
  const routes = Router();

  routes
    .route('/')
    .get(productsController.getAll)
    .post(productsController.addProduct);

  routes
    .route('/:productId/')
    .get(productsController.getById)
    .put(productsController.updateProductById)
    .delete(productsController.deleteProductById);

  return routes;
}

module.exports = productsRouter();
