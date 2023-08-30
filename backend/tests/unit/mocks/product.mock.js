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

const newProduct = { name: 'ProductX' };
// const newProductAdded = { id: 4, name: 'Capa da invisibilidade' };
// const updatedProduct = { id: 1, name: 'ProductY' };

const productAdded = { id: 4, name: 'ProductX' };

const productAddedSucess = {
  status: 'CREATED',
  data: productAdded,
};

const productDeleteSucessMock = {
  status: 204,
  product: true,
};

const productDeleteFailedMock = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
  product: false,
};

module.exports = {
  productsMock,
  product1Mock,
  productMockService,
  productsMockService,
  newProduct,
  productAdded,
  productAddedSucess,
  productDeleteSucessMock,
  productDeleteFailedMock,
};