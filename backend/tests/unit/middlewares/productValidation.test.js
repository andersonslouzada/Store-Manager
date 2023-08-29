const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productValidation } = require('../../../src/middlewares/productValidation');

const { expect } = chai;
chai.use(sinonChai);

describe('Testa o middleware de validação dos produtos: ', function () {
  it('Testando middleware validateNewProduct caso tenha a chave name', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: { name: 'ProductX' },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productValidation(req, res, next);

    expect(next).to.have.been.calledWith();
  });

  it('Se não receber um "name" retorna o valor esperado', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: { },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });
  
  it('Se ao receber um "name" menor que 5 retorna o esperado', async function () {
    const next = sinon.stub().returns();
    const req = {
      body: { name: 'Bola' },
    };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await productValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });
});