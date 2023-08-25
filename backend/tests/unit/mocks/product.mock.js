const productsMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const product1Mock = {
  id: 1,
  name: 'Martelo de Thor',
};

const productsMockService = {
  status: 'SUCCESSFUL',
  data: productsMock,
};

const productMockService = {
  status: 'SUCCESSFUL',
  data: product1Mock,
};

const notFound = { message: 'Product not found' };

module.exports = {
  productsMock,
  product1Mock,
  notFound,
  productMockService,
  productsMockService,
};