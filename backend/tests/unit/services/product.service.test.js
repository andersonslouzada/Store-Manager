const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { productService } = require('../../../src/services');
const { productsMock, product1Mock, newProduct, productAdded } = require('../mocks/product.mock');

describe('Testa o products service: ', function () {
  it('Se ao fazer uma requisição para o endpoint  GET /products, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'findAll').resolves([productsMock]);
    const response = await productService.findAll();

    expect(response.data).to.be.deep.equal([productsMock]);
    expect(response.status).to.be.equal('SUCCESSFUL');
  });

  it('Se ao fazer uma requisição para o endpoint  GET /products/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'findByID').resolves([[product1Mock]]);
    const response = await productService.findByID(1);

    expect(response.data).to.be.deep.equal([[product1Mock]]);
    expect(response.status).to.equal('SUCCESSFUL');
  });

  it('Se ao fazer uma requisição errada para o endpoint  GET /products, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'findAll').resolves(undefined);
    const response = await productService.findAll();

    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal({ message: 'Products not found' });
  });

  it('Se ao fazer uma requisição errada para o endpoint  GET /products/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'findByID').resolves([]);
    const response = await productService.findByID(10);

    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal({ message: 'Product not found' });
  });

  it('Se ao fazer uma requisição para o endpoint  POST /products com uma requisição válida, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'addProduct').resolves(4);
    const responseProduct = await productService.addProduct(newProduct);

    expect(responseProduct.status).to.equal('CREATED');
    expect(responseProduct.data).to.deep.equal(productAdded);
  });

  it('Se ao fazer uma requisição para o endpoint  DELETE /products/:id com uma requisição válida, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'findByID').resolves({ id: 1, name: 'Product 1' });
    sinon.stub(productModel, 'deleteProduct').resolves();
    const response = await productService.deleteProduct(1);

    expect(response).to.deep.equal({ status: 204, product: true });
  });

  afterEach(function () {
    sinon.restore();
  });
});