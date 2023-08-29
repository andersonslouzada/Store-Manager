const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { salesMock, sale1Mock } = require('../mocks/sales.mock');

describe('Testa o products service: ', function () {
  it('Se ao fazer uma requisição para o endpoint  GET /products, retorna o resultado esperado', async function () {
    sinon.stub(salesModel, 'findAll').resolves([salesMock]);
    const response = await salesService.findAll();
    expect(response.data).to.be.deep.equal([salesMock]);
    expect(response.status).to.be.equal('SUCCESSFUL');
  });

  it('Se ao fazer uma requisição para o endpoint  GET /products/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(salesModel, 'findByID').resolves([sale1Mock]);
    const response = await salesService.findByID(1);
    expect(response.data).to.be.deep.equal([sale1Mock]);
    expect(response.status).to.equal('SUCCESSFUL');
  });

  it('Se ao fazer uma requisição errada para o endpoint  GET /products, retorna o resultado esperado', async function () {
    sinon.stub(salesModel, 'findAll').resolves(undefined);
    const response = await salesService.findAll();
    expect(response.status).to.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal({ message: 'Sales not found' });
  });

  it('Se ao fazer uma requisição errada para o endpoint  GET /products/:id com um id válido, retorna o resultado esperado', async function () {
    sinon.stub(salesModel, 'findByID').resolves([]);
    const response = await salesService.findByID(10);
    expect(response.status).to.be.equal('NOT_FOUND');
    expect(response.data).to.be.deep.equal({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});