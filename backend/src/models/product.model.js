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

const updateProduct = async (id, name) => {
  const [{ productToUpdate }] = await connection
    .execute('UPDATE products SET name = ? WHERE id = ?', [name, id]);
  return productToUpdate;
};

const deleteProduct = async (id) => {
  const [{ productToDelete }] = await connection
    .execute('DELETE FROM products WHERE id = ?', [id]);
  return productToDelete;
};

module.exports = {
  findAll,
  findByID,
  addProduct,
  updateProduct,
  deleteProduct,
};