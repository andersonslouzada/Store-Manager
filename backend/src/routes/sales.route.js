const route = require('express').Router();
const { salesController } = require('../controllers');
const { idValidation, quantityValidation } = require('../middlewares/saleValidation');

route.get('/', salesController.getAllProducts);
route.get('/:id', salesController.getProductByID);
route.post('/', idValidation, quantityValidation, salesController.addSale);
route.delete('/:id', salesController.deleteSale);

module.exports = route;