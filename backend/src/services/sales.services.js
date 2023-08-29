const { salesModel } = require('../models');

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

const addSale = async (products) => {
  const id = await salesModel.addProductSale(products);
  const data = { id, itemsSold: products };
  return { status: 'CREATED', data };
};

module.exports = { 
  findAll,
  findByID,
  addSale,
};