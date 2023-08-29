const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { salesMock, sale1Mock, newProductsMock } = require('../mocks/sales.mock');

describe('Testa o sales model: ', function () {
  it('Se ao fazer uma requisição para o endpoint  GET /sales, retorna o resultado esperado', async function () {
    sinon.stub(connection, 'execute').resolves([salesMock]);
    const sales = await salesModel.findAll();
    expect(sales).to.be.deep.equal(salesMock);
    expect(sales).to.be.an('array');
  });

  it('Se ao fazer uma requisição para o endpoint  GET /sales/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(connection, 'execute').resolves([sale1Mock]);
    const sale = await salesModel.findByID(1);
    expect(sale).to.be.deep.equal(sale1Mock);
    expect(sale).to.be.an('array');
  });

  it('Se ao fazer uma requisição para o endpoint POST /sales, retorna o resultado esperado', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const id = await salesModel.addProductSale(newProductsMock);
    expect(id).to.equal(3);
    expect(id).to.be.an('number');
  });

  afterEach(function () {
    sinon.restore();
  });
});