const salesMock = [
  {
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 3,
  },
  {
    saleId: 2,
    date: '2021-09-09T04:54:31.000Z',
    productId: 2,
    quantity: 4,
  },
];

const sale1Mock = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2,
  },
];

const salesMockService = {
  status: 'SUCCESSFUL',
  data: salesMock,
};

const saleMockService = {
  status: 'SUCCESSFUL',
  data: sale1Mock,
};

const newProductsMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const saleAddedMock = {
  id: 3,
  itemsSold: newProductsMock,
};

const addSaleSuccess = {
  status: 'CREATED',
  data: saleAddedMock,
};

module.exports = {
  salesMock,
  sale1Mock,
  salesMockService,
  saleMockService,
  newProductsMock,
  saleAddedMock,
  addSaleSuccess,
};