const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { productsMock, product1Mock } = require('../mocks/product.mock');

describe('Testa o products model: ', function () {
  it('Se ao fazer uma requisição para o endpoint  GET /products, retorna o resultado esperado', async function () {
    sinon.stub(connection, 'execute').resolves([productsMock]);
    const products = await productModel.findAll();
    expect(products).to.be.deep.equal(productsMock);
    expect(products).to.be.an('array');
  });

  it('Se ao fazer uma requisição para o endpoint  GET /products/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(connection, 'execute').resolves([[product1Mock]]);
    const product = await productModel.findByID(1);
    expect(product).to.be.deep.equal(product1Mock);
    expect(product).to.be.an('object');
  });

  afterEach(function () {
    sinon.restore();
  });
});