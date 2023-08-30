const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productService } = require('../../../src/services');
const { productsMock, product1Mock, productsMockService, productMockService, productAddedSucess, productAdded, productDeleteSucessMock, productDeleteFailedMock } = require('../mocks/product.mock');
const { productController } = require('../../../src/controllers');
const { productModel } = require('../../../src/models');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa o products controller:', function () {
  it('Se ao fazer uma requisição para o endpoint  GET /products, retorna o resultado esperado', async function () {
    sinon.stub(productService, 'findAll').resolves(productsMockService);
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productController.getAllProducts({}, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsMock);
  });

  it('Se ao fazer uma requisição para o endpoint  GET /products/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(productService, 'findByID').resolves(productMockService);
    const req = {
      params: { id: 1 },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productController.getProductByID(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(product1Mock);
  });

  it('Se ao fazer uma requisição para o endpoint  POST /products com uma requisição válida, retorna o resultado esperado', async function () {
    sinon.stub(productService, 'addProduct').resolves(productAddedSucess);
    const req = {
      body: { name: 'ProductX' },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productController.addProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productAdded);
  });

  it('Se ao fazer uma requisição válida para o endpoint DELETE /products/:id, retorna o resultado esperado', async function () {
    sinon.stub(productService, 'deleteProduct').resolves(productDeleteSucessMock);
    const req = { params: { id: 1 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('Se ao fazer uma requisição inválida para o endpoint DELETE /products/:id, retorna o resultado esperado', async function () {
    sinon.stub(productModel, 'deleteProduct').resolves(-8);
    sinon.stub(productService, 'deleteProduct').resolves(productDeleteFailedMock);
    const req = { params: { id: 5 } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
