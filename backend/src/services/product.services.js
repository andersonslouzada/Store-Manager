const { productModel } = require('../models');

const findAll = async () => {
  const data = await productModel.findAll();
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Products not found' } };
  return { status: 'SUCCESSFUL', data };
};

const findByID = async (productID) => {
  const data = await productModel.findByID(productID);
  if (!data || data.length === 0) { 
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data };
};

module.exports = { 
  findAll,
  findByID,
};