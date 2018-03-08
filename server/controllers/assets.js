const models = require('../models/index');
const mailer = require('../utils/mailer');

exports.create = (req, res, next, orm = models) => {
  orm.User.findById(req.user.id).then(user =>
    user.getWallets().then(wallets =>
      wallets[0].createAsset({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        serial: req.body.serial,
      }).then((asset) => {
        res.status(200).json({ asset });
      }).catch((error) => {
        console.log(error);
        res.status(400).json({ errors: error.errors });
      })).catch((error) => {
      res.status(400).json({ errors: error.errors });
    })).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};

exports.read = (req, res, next, orm = models) => {
  if (req.params.id) {
    orm.Asset.findAll({
      where: {
        id: req.params.id,
      },
      include: [{
        model: orm.Wallet,
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
    orm.Asset.findAll({
      include: [{
        model: orm.Wallet,
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

exports.update = (req, res, next, orm = models, mail = mailer) => {
  orm.User.findOrCreate({
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
      association: orm.User.Wallets,
    }],
  }).spread((user, created) =>
    orm.Asset.findById(req.params.id)
      .then(asset =>
        asset.setWallet(user.Wallets[0])
        // user.Wallets[0].addAsset(asset)
          .then(() => {
            // mail.send({
            //   from: '"Oblatum 👻" <support@oblatum.it>',
            //   to: 'support@oblatum.it',
            //   subject: 'Congratulations ✔',
            //   body: `Someone just registered ${asset.manufacturer} ${asset.model} (${asset.serial}) to you in Oblatum. Log in on http://www.oblatum.it to see more!`,
            // });
            res.status(200).json({ asset, created });
          }).catch((error) => {
            res.status(400).json({ errors: error.errors });
          })).catch((error) => {
        res.status(400).json({ errors: error.errors });
      })).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};
