const productValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === null) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  next();
};

module.exports = {
  productValidation,
};