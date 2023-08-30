const route = require('express').Router();
const { productController } = require('../controllers');
const { productValidation } = require('../middlewares/productValidation');

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProductByID);
route.post('/', productValidation, productController.addProduct);
route.put('/:id', productValidation, productController.updateProduct); 
route.delete('/:id', productController.deleteProduct);

module.exports = route;