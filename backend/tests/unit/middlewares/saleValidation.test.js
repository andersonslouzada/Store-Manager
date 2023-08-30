const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { idValidation, quantityValidation } = require('../../../src/middlewares/saleValidation');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa o middleware de validação de vendas:', function () {
  it('Testando caso tenha a chave productId', async function () {
    const req = { body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();

    await idValidation(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Testando caso não tenha a chave productId', async function () {
    const req = { body: [{ quantity: 1 }, { productId: 2, quantity: 5 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    const next = sinon.stub();

    await idValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });

  it('Testando caso tenha a chave quantity', async function () {
      const req = { body: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };
      const res = { status: sinon.stub(), json: sinon.stub() };
      const next = sinon.stub();
    
      await quantityValidation(req, res, next);
    
      expect(next).to.have.been.calledWith();
    });
    
  it('Testando caso não tenha a chave quantity', async function () {
      const req = { body: [{ productId: 1 }, { productId: 2, quantity: 5 }] };
      const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
      const next = sinon.stub();
    
      await quantityValidation(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });
});
