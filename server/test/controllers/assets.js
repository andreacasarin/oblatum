const { assert } = require('chai');
const { describe, it } = require('mocha');
const assets = require('../../controllers/assets');

describe('Assets', () => {
  it('should create asset if params are right', (done) => {
    const req = {
      user: {
        id: 1,
      },
      body: {
        manufacturer: 'test1',
        model: 'test2',
        serial: 'test3',
      },
    };
    const res = {
      status: (code) => {
        assert.equal(200, code);
        return res;
      },
      json: (data) => {
        assert.equal(true, data.asset);
        done();
      },
    };
    const modelsStub = {
      User: {
        scope: (scope1, scope2) => {
          assert('withWallets', scope1);
          assert({ method: ['authorized', req.user.id] }, scope2);
          return modelsStub.User;
        },
        findById: (id) => {
          assert.equal(1, id);
          return Promise.resolve({
            id: 1,
            Wallets: [
              {
                createAsset: (data) => {
                  assert.equal('test1', data.manufacturer);
                  assert.equal('test2', data.model);
                  assert.equal('test3', data.serial);
                  return Promise.resolve(true);
                },
              },
            ],
          });
        },
      },
    };
    assets.create(req, res, {}, modelsStub);
  });

  // it('should not create asset if password is wrong', (done) => {
  //   const req = {
  //     body: {
  //       email: 'test@example.com',
  //       password: 'test',
  //     },
  //     params: {},
  //   };
  //   const res = {
  //     status: (code) => {
  //       assert.equal(401, code);
  //       return res;
  //     },
  //     json: (data) => {
  //       assert.equal('Bad credentials', data.errors[0].message);
  //       done();
  //     },
  //   };
  //   const modelsStub = {
  //     User: {
  //       findAll: (options) => {
  //         assert.equal('test@example.com', options.where.email);
  //         return Promise.resolve([
  //           {
  //             name: 'test',
  //             checkPassword: (password) => {
  //               assert.equal('test', password);
  //               return false;
  //             },
  //           },
  //         ]);
  //       },
  //     },
  //   };
  //   assets.create(req, res, {}, modelsStub);
  // });

  // it('should not create asset if user is not found', (done) => {
  //   const req = {
  //     body: {
  //       email: 'test@example.com',
  //       password: 'test',
  //     },
  //     params: {},
  //   };
  //   const res = {
  //     status: (code) => {
  //       assert.equal(401, code);
  //       return res;
  //     },
  //     json: (data) => {
  //       assert.equal('Bad credentials', data.errors[0].message);
  //       done();
  //     },
  //   };
  //   const modelsStub = {
  //     User: {
  //       findAll: (options) => {
  //         assert.equal('test@example.com', options.where.email);
  //         return Promise.reject({ errors: [0, 1] });
  //       },
  //     },
  //   };
  //   assets.create(req, res, {}, modelsStub);
  // });

  // it('should read asset form middleware', (done) => {
  //   const req = {
  //     tokenDecoded: '123',
  //     params: {},
  //   };
  //   const res = {
  //     status: (code) => {
  //       assert.equal(200, code);
  //       return res;
  //     },
  //     json: (data) => {
  //       assert.equal('123', data.user);
  //       done();
  //     },
  //   };
  //   assets.read(req, res, {});
  // });

  // it('should verify asset with valid token', (done) => {
  //   const req = {
  //     headers: {
  //       authorization: 'Bearer 123',
  //     },
  //     body: {},
  //     params: {},
  //   };
  //   const res = {};
  //   const jwtStub = {
  //     verify: (token, secret) => {
  //       assert.equal('123', token);
  //       assert.ok(secret !== '');
  //       return 321;
  //     },
  //   };
  //   const nextStub = () => {
  //     assert.equal('321', req.tokenDecoded);
  //     assert.ok(true);
  //     done();
  //   };
  //   assets.verify(req, res, nextStub, jwtStub);
  // });

  // it('should not verify asset with invalid token', (done) => {
  //   const req = {
  //     headers: {
  //       authorization: 'Bearer 123',
  //     },
  //     body: {},
  //     params: {},
  //   };
  //   const res = {
  //     status: (code) => {
  //       assert.equal(403, code);
  //       return res;
  //     },
  //     json: (data) => {
  //       assert.equal('Forbidden', data.errors[0].message);
  //       done();
  //     },
  //   };
  //   const jwtStub = {
  //     verify: (token, secret) => {
  //       assert.equal('123', token);
  //       assert.ok(secret !== '');
  //       throw new Error('error');
  //     },
  //   };
  //   const nextStub = () => {
  //     assert.equal('321', req.tokenDecoded);
  //     assert.ok(true);
  //     done();
  //   };
  //   assets.verify(req, res, nextStub, jwtStub);
  // });
});
