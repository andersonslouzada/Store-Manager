const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { productsMock, product1Mock, notFound } = require('../mocks/product.mock');

describe('Testa o products service: ', function () {
  it('Se ao fazer uma requisição para o endpoint  GET /products, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'findAll').resolves([productsMock]);
    const response = await productService.findAll();
    expect(response.data).to.be.deep.equal(productsMock);
    expect(response.status).to.equal('SUCCESSFUL');
  });

  it('Se ao fazer uma requisição para o endpoint  GET /products/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'findByID').resolves([[product1Mock]]);
    const response = await productService.findByID(1);
    expect(response.data).to.be.deep.equal(product1Mock);
    expect(response.status).to.equal('SUCCESSFUL');
  });

  it('Se ao fazer uma requisição errada para o endpoint  GET /products, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'findAll').resolves();
    const response = await productService.findAll();
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.message).to.be.deep.equal(notFound);
  });

  it('Se ao fazer uma requisição errada para o endpoint  GET /products/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'findByID').resolves();
    const response = await productService.findByID(10);
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.message).to.be.deep.equal(notFound);
  });

  afterEach(function () {
    sinon.restore();
  });
});