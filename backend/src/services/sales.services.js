const { salesModel } = require('../models');
const { productModel } = require('../models');

const findAll = async () => {
  const data = await salesModel.findAll();
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Sales not found' } };
  return { status: 'SUCCESSFUL', data };
};

const findByID = async (saleID) => {
  const data = await salesModel.findByID(saleID);
  if (!data || data.length === 0) { 
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data };
};

const existingId = async (products) => {
  const data = await Promise.all(products.map(async ({ productId }) => {
    const productExists = await productModel.findByID(productId);
    return Boolean(productExists);
  }));
  return data.every((check) => check);
};

const addSale = async (products) => {
  const verifyProducts = await existingId(products);
  if (!verifyProducts) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };

  const id = await salesModel.addProductSale(products);
  const data = { id, itemsSold: products };
  return { status: 'CREATED', data };
};

const deleteSale = async (id) => {
    const data = await salesModel.deleteSale(id);
    if (data) return { status: 204, product: true };
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' }, product: false }; 
  };

module.exports = { 
  findAll,
  findByID,
  existingId,
  addSale,
  deleteSale,
};