const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
      `SELECT sale_id AS saleId, date, product_id AS productId, quantity FROM sales_products 
      INNER JOIN sales AS s
      ON s.id = sale_id 
      ORDER BY sale_id, product_id`,
  );
  return sales;
};

const findByID = async (id) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id AS productId, quantity FROM sales_products 
    INNER JOIN sales s
    ON s.id = sale_id 
    WHERE id = ?
    ORDER BY product_id;`,
    [id],
  );
  return sale;
};

const addSale = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales () VALUES ()',
    );
  return insertId;
};

const addProductSale = async (products) => {
  const saleId = await addSale();
  const saleProducts = products.map(({ productId, quantity }) => 
    connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)', 
      [saleId, productId, quantity],
));
  await Promise.all(saleProducts);
  return saleId;
};

const deleteSale = async (saleId) => {
  const [{ affectedRows }] = await connection
    .execute('DELETE FROM sales WHERE id = ?', [saleId]);
  return affectedRows;
};

module.exports = {
  findAll,
  findByID,
  addProductSale,
  deleteSale,
};