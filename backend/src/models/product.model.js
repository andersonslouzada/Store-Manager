const connection = require('./connection');

const findAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products ORDER BY id',
  );
  return products;
};

const findByID = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  if (product === undefined) return false;
  return product;
};

const addProduct = async (name) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?)',
    [name],
  );

  return insertId;
};

module.exports = {
  findAll,
  findByID,
  addProduct,
};