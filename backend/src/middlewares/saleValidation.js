const idValidation = (req, res, next) => {
  const products = req.body;
  const verifyID = products.every((product) => 
    'productId' in product && product.productId !== undefined);
  if (!verifyID) return res.status(400).json({ message: '"productId" is required' });
  next();
};

const quantityValidation = (req, res, next) => {
  const products = req.body;
  const quantityExists = products.every((product) => 'quantity' in product);
  const quantityCorrect = products.every((product) => 
    'quantity' in product && product.quantity > 0);
  if (!quantityExists) return res.status(400).json({ message: '"quantity" is required' });
  if (!quantityCorrect) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

// const quantityValidation = (req, res, next) => {
//   const products = req.body;

//   const missingQuantity = products.some((product) => !('quantity' in product));
//   const invalidQuantity = products.some((product) => 
//     'quantity' in product && product.quantity <= 0);

//   if (missingQuantity) {
//     return res.status(400).json({ message: '"quantity" is required' });
//   }

//   if (invalidQuantity) {
//     return res.status(422).json({ message: '"quantity" must be greater than 0' });
//   }

//   next();
// };

const saleValidation = [
  idValidation,
  quantityValidation,
];

module.exports = saleValidation;