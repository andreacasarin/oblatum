const orm = require('../models/index');

exports.create = (req, res, next, models = orm) => {
  models.User.findById(req.user.id).then(user =>
    user.getWallets().then(wallets =>
      wallets[0].createAsset({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        serial: req.body.serial,
      }).then((asset) => {
        res.status(200).json({ asset });
      }).catch((error) => {
        res.status(400).json({ errors: error.errors });
      })).catch((error) => {
      res.status(400).json({ errors: error.errors });
    })).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};

exports.read = (req, res, next, models = orm) => {
  if (req.params.id) {
    models.Asset.findAll({
      where: {
        id: req.params.id,
      },
      include: [{
        model: models.Wallet,
        where: {
          userId: req.user.id,
        },
      }],
    }).then((assets) => {
      res.status(200).json({ asset: assets[0] });
    }).catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
  } else {
    models.Asset.findAll({
      include: [{
        model: models.Wallet,
        where: {
          userId: req.user.id,
        },
      }],
    }).then((assets) => {
      res.status(200).json({ assets });
    }).catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
  }
};

exports.update = (req, res, next, models = orm) => {
  models.User.findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: {
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation,
      Wallets: [{}],
    },
    include: [{
      association: models.User.Wallets,
    }],
  }).spread((user, created) => {
    models.Asset.findById(req.params.id)
      .then((asset) => {
        user.Wallets[0].addAsset(asset)
          .then(() => {
            res.status(200).json({ asset, created });
          }).catch((error) => {
            res.status(400).json({ errors: error.errors });
          });
      }).catch((error) => {
        res.status(400).json({ errors: error.errors });
      });
  }).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};
