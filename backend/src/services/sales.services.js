const { salesModel } = require('../models');

const findAll = async () => {
  const data = await salesModel.findAll();
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Sales not found' } };
  return { status: 'SUCCESSFUL', data };
};

const findByID = async (productID) => {
  const data = await salesModel.findByID(productID);
  if (!data || data.length === 0) { 
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data };
};

module.exports = { 
  findAll,
  findByID,
};