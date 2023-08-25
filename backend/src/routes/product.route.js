const route = require('express').Router();
const { productController } = require('../controllers');

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProductByID);

module.exports = route;