const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesMock, sale1Mock, salesMockService, saleMockService, addSaleSuccess, saleAddedMock } = require('../mocks/sales.mock');
const { salesController } = require('../../../src/controllers');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa o products controller:', function () {
  it('Se ao fazer uma requisição para o endpoint  GET /products, retorna o resultado esperado', async function () {
    sinon.stub(salesService, 'findAll').resolves(salesMockService);
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await salesController.getAllProducts({}, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesMock);
  });

  it('Se ao fazer uma requisição para o endpoint  GET /products/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(salesService, 'findByID').resolves(saleMockService);
    const req = {
      params: { id: 1 },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await salesController.getProductByID(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(sale1Mock);
  });

  it('Verifica se ao fazer a requisição com os dados corretos do pedido uma nova venda é cadastrada com sucesso', async function () {
    sinon.stub(salesService, 'addSale').resolves(addSaleSuccess);
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const req = { body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
    await salesController.addSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(saleAddedMock);
  });
});