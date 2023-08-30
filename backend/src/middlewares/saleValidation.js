const idValidation = (req, res, next) => {
  const products = req.body;
  const verifyID = products.every((product) => 
    'productId' in product && product.productId !== undefined);
  if (!verifyID) return res.status(400).json({ message: '"productId" is required' });
  next();
};

const quantityValidation = (req, res, next) => {
  const products = req.body;

  const missingQuantity = products.some((product) => !('quantity' in product));
  const invalidQuantity = products.some((product) => 
    'quantity' in product && product.quantity <= 0);

  if (missingQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (invalidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

module.exports = { 
  idValidation,
  quantityValidation,
 };