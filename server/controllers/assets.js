const models = require('../models/index');
const mailer = require('../utils/mailer');

exports.create = (req, res, next, orm = models) => {
  orm.User
    .scope('withWallets', { method: ['authorized', req.user.id] })
    .findById(req.user.id)
    .then(user =>
      user.Wallets[0].createAsset(req.body)
        .then((asset) => {
          res.status(200).json({ asset });
        })
        .catch((error) => {
          res.status(400).json({ errors: error.errors });
        }))
    .catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
};

exports.read = (req, res, next, orm = models) => {
  if (req.params.id) {
    orm.Asset
      .scope({ method: ['authorized', req.user.id] })
      .findById(req.params.id)
      .then((asset) => {
        res.status(200).json({ asset });
      })
      .catch((error) => {
        res.status(400).json({ errors: error.errors });
      });
  } else {
    orm.Asset
      .scope({ method: ['authorized', req.user.id] })
      .findAll()
      .then((assets) => {
        res.status(200).json({ assets });
      })
      .catch((error) => {
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
  })
    .then(user =>
      orm.Asset
        .scope({ method: ['authorized', req.user.id] })
        .findById(req.params.id)
        .then(asset =>
          asset.setWallet(user[0].Wallets[0])
            .then(() => {
              mail.send({
                from: '"Oblatum 👻" <support@oblatum.io>',
                to: user[0].email,
                subject: 'Asset registered ✔',
                body: 'Someone just registered' +
                  `${asset.manufacturer} ${asset.model} (${asset.serial}) ` +
                  'to you in Oblatum. Log in on http://www.oblatum.io to see more!',
              });
              res.status(200).json({ asset });
            })
            .catch((error) => {
              res.status(400).json({ errors: error.errors });
            }))
        .catch((error) => {
          res.status(400).json({ errors: error.errors });
        }))
    .catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
};
