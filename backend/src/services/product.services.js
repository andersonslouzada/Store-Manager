const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();
  if (!products) return { status: 'NOT_FOUND', message: 'Product not found' };
  return { status: 'SUCCESSFUL', products };
};

const findByID = async (productID) => {
  const product = await productModel.findByID(productID);
  if (!product) return { status: 'NOT_FOUND', message: 'Product not found' };
  return { status: 'SUCCESSFUL', product };
};

module.exports = { 
  findAll,
  findByID,
};