const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productModel } = require('../../../src/models');
const { productsMock, product1Mock, newProduct } = require('../mocks/product.mock');

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

  it('Se ao fazer uma requisição para o endpoint  POST /products com uma requisição válida, retorna o resultado esperado', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const id = await productModel.addProduct(newProduct.name);

    expect(id).to.be.deep.equal(4);
    expect(id).to.be.an('number');
  });

 it('Se ao fazer uma requisição para o endpoint  DELETE /products/:id com uma requisição válida, retorna o resultado esperado', async function () {
    sinon.stub(connection, 'execute').resolves([{ productToDelete: { id: 1, name: 'Product 1' } }]);

    const response = await productModel.deleteProduct(1);
    expect(response).to.deep.equal({ id: 1, name: 'Product 1' });
  });

  afterEach(function () {
    sinon.restore();
  });
});