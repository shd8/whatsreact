const {
  getAll, addProduct, deleteProductById, updateProductById, getById,
} = require('./productsController')();
const Product = require('../models/product.model');

jest.mock('../models/product.model.js');

describe('Given a getAll function', () => {
  test('Should respond with status 200', async () => {
    Product.find.mockResolvedValueOnce(200);
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    await getAll(null, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('Should respond with curriculums json', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };
    Product.find.mockResolvedValueOnce([{}]);

    await getAll(null, res);

    expect(res.json).toHaveBeenCalledWith([{}]);
  });

  test('Should respond with error', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };
    Product.find.mockRejectedValueOnce('error');

    await getAll(null, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('Given a getById function', () => {
  test('Should respond with curriculums json', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const req = {
      params: {
        productId: 3,
      },
    };
    Product.findById.mockResolvedValueOnce([{}]);

    await getById(req, res);

    expect(res.json).toHaveBeenCalledWith([{}]);
  });

  test('Should respond with error', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const req = {
      params: {
        productId: 3,
      },
    };
    Product.findById.mockRejectedValueOnce('error');

    await getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});

describe('Given an add curriculum function', () => {
  test('Should respond with status 200', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const req = {
      params: {
        productId: 3,
      },
    };

    Product.findByIdAndUpdate.mockResolvedValueOnce();

    await addProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('should call send', async () => {
    // arrange
    const req = {
      body: null,
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
    };

    Product.mockReturnValueOnce({
      save: jest.fn().mockRejectedValueOnce('error'),
    });

    // act
    await addProduct(req, res);
    // assert
    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('Given a delete curriculum function', () => {
  test('Should respond with status 204', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const req = {
      params: {
        productId: 3,
      },
    };

    Product.findByIdAndUpdate.mockResolvedValueOnce();

    await deleteProductById(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
  });

  test('Should respond with error', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const req = {
      params: {
        productId: 3,
      },
    };

    Product.findByIdAndDelete.mockRejectedValueOnce('error');

    await deleteProductById(req, res);

    expect(res.send).toHaveBeenCalledWith('error');
  });
});

describe('Given an update curriculum function', () => {
  test('Should respond with updated curriculum json', async () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const req = {
      body: {},
      params: { productId: 3 },
    };

    Product.findOneAndUpdate.mockResolvedValueOnce([{}]);

    await updateProductById(req, res);

    expect(res.json).toHaveBeenCalledWith([{}]);
  });

  test('should call send', async () => {
    // arrange
    const req = {
      body: null,
      params: { productId: 3 },
    };
    const res = {
      json: jest.fn(),
      send: jest.fn(),
    };

    Product.findOneAndUpdate.mockResolvedValueOnce();
    // act
    await updateProductById(req, res);
    // assert
    expect(res.send).toHaveBeenCalledWith(204);
  });
});
