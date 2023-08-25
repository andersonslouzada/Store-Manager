const { productModel } = require('../models');

const findAll = async () => {
  const products = await productModel.findAll();
  return { status: 'SUCCESSFUL', data: products };
};

const findByID = async (productID) => {
  const product = await productModel.findByID(productID);
  return { status: 'SUCCESSFUL', data: product };
};

module.exports = { 
  findAll,
  findByID,
};