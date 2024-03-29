const { productService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllProducts = async (_req, res) => {
  const { status, data } = await productService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getProductByID = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productService.findByID(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const addProduct = async (req, res) => {
  const product = req.body;
  const { status, data } = await productService.addProduct(product);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const productToUpdate = req.body;
  
  const { status, data } = await productService.updateProduct(id, productToUpdate);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data, product } = await productService.deleteProduct(id);

  if (product) return res.status(status).json();
  if (!product) return res.status(mapStatusHTTP(status)).json(data);
};

const findProduct = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await productService.findProduct(q);

  return res.status(mapStatusHTTP(status)).json(data);
};
  
module.exports = {
  getAllProducts,
  getProductByID,
  addProduct,
  updateProduct,
  deleteProduct,
  findProduct,
};