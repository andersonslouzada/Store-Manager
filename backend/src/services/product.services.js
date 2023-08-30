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

const addProduct = async (product) => {
  const { name } = product;
  const id = await productModel.addProduct(name);
  return { status: 'CREATED', data: { id, name } };
};

const updateProduct = async (id, element) => {
  const { name } = element;
  const product = await productModel.findByID(id);
  if (!product) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  
  await productModel.updateProduct(id, name);
  return { status: 'SUCCESSFUL', data: { id: Number(id), name } };
};

module.exports = { 
  findAll,
  findByID,
  addProduct,
  updateProduct,
};