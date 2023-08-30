const route = require('express').Router();
const { salesController } = require('../controllers');
const saleValidation = require('../middlewares/saleValidation');

route.get('/', salesController.getAllProducts);
route.get('/:id', salesController.getProductByID);
route.post('/', saleValidation, salesController.addSale);

module.exports = route;