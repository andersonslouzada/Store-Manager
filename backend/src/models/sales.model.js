const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
      `SELECT sale_id, date, product_id, quantity FROM sales_products 
      INNER JOIN sales AS s
      ON s.id = sale_id 
      ORDER BY sale_id, product_id`,
  );
  return sales;
};

const findByID = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT date, product_id, quantity FROM sales_products 
    INNER JOIN sales s
    ON s.id = sale_id 
    WHERE id = ?
    ORDER BY product_id;`,
    [saleId],
  );
  return sale;
};

module.exports = {
  findAll,
  findByID,
};