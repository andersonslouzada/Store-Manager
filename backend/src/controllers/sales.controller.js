const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (req, res) => {
  const { status, data } = await salesService.findAll();

  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductByID = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findByID(id);

  return res.status(mapStatusHTTP(status)).json(data);
};

const addSale = async (req, res) => {
  const products = req.body;
  const { status, data } = await salesService.addSale(products);

  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { status, data, product } = await salesService.deleteSale(id);

  if (product) return res.status(status).json();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getAllProducts,
  getProductByID,
  addSale,
  deleteSale,
};