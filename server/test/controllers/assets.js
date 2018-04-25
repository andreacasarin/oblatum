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

  it('it should call model with right parameters to read all assets', (done) => {
    const req = { params: {}, user: { id: 1 } };
    const res = {
      status: (data) => {
        assert.equal(200, data);
        return res;
      },
      json: (data) => {
        assert.equal(1, data.assets[0].id);
        assert.equal(2, data.assets[1].id);
        done();
      },
    };
    const modelsStub = {
      Asset: {
        scope: (scope1) => {
          assert.equal('authorized', scope1.method[0]);
          assert.equal(req.user.id, scope1.method[1]);
          return modelsStub.Asset;
        },
        findAll: (data) => {
          assert.equal(null, data);
          return Promise.resolve([{ id: 1 }, { id: 2 }]);
        },
      },
    };
    assets.read(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to read a asset', (done) => {
    const req = { params: { id: 1 }, user: { id: 1 } };
    const res = {
      status: (data) => {
        assert.equal(200, data);
        return res;
      },
      json: (data) => {
        assert.equal(1, data.asset.id);
        done();
      },
    };
    const modelsStub = {
      Asset: {
        scope: (scope1) => {
          assert.equal('authorized', scope1.method[0]);
          assert.equal(req.user.id, scope1.method[1]);
          return modelsStub.Asset;
        },
        findById: (data) => {
          assert.equal(data, req.params.id);
          return Promise.resolve({ id: 1 });
        },
      },
    };
    assets.read(req, res, {}, modelsStub);
  });

  it('it should call model with right parameters to update a asset', (done) => {
    const req = {
      body: {
        email: 'test@example.com',
        name: 'Name',
        surname: 'Surname',
        password: '12345678',
        passwordConfirmation: '12345678',
      },
      params: { id: 1 },
      user: { id: 1 },
    };
    const res = {
      status: (data) => {
        assert.equal(200, data);
        return res;
      },
      json: (data) => {
        assert.equal('123', data.asset.manufacturer);
        assert.equal('456', data.asset.model);
        assert.equal('789', data.asset.serial);
        done();
      },
    };
    const modelsStub = {
      User: {
        findOrCreate: (options) => {
          assert.equal(req.body.email, options.where.email);
          assert.equal(req.body.name, options.defaults.name);
          assert.equal(req.body.surname, options.defaults.surname);
          assert.equal(req.body.password, options.defaults.password);
          assert.equal(req.body.passwordConfirmation, options.defaults.passwordConfirmation);
          assert.equal(modelsStub.User.Wallets, options.include[0].association);
          return Promise.resolve([{
            name: 'test',
            surname: 'test',
            email: 'test',
            Wallets: [{ test: 'test' }],
          }]);
        },
        Wallets: {},
      },
      Asset: {
        scope: (scope1) => {
          assert.equal('authorized', scope1.method[0]);
          assert.equal(req.user.id, scope1.method[1]);
          return modelsStub.Asset;
        },
        findById: (id) => {
          assert.equal(1, id);
          return Promise.resolve({
            manufacturer: '123',
            model: '456',
            serial: '789',
            setWallet: (wallet) => {
              assert('test', wallet.test);
              return Promise.resolve();
            },
          });
        },
      },
    };
    const mailStub = {
      send: (data) => {
        assert('"Oblatum 👻" <support@oblatum.it>', data.from);
      },
    };
    assets.update(req, res, {}, modelsStub, mailStub);
  });
});
