const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProductByID);
route.post('/', productController.addProduct);

module.exports = route;