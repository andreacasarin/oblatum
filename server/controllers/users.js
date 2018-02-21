const orm = require('../models/index');

exports.create = (req, res, next, models = orm) => {
  models.User.create({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
    Wallets: [{}],
  }, {
    include: [{
      association: models.User.Wallets,
    }],
  }).then((user) => {
    res.status(200).json({ user });
  }).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};

exports.read = (req, res, next, models = orm) => {
  if (req.params.id) {
    models.User.findById(req.params.id).then((user) => {
      res.status(200).json({ user });
    }).catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
  } else {
    models.User.findAll().then((users) => {
      res.status(200).json({ users });
    }).catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
  }
};

exports.update = (req, res, next, models = orm) => {
  models.User.update(req.body, { where: { id: req.params.id } }).then((user) => {
    res.status(200).json({ user });
  }).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};

exports.delete = (req, res, next, models = orm) => {
  models.User.destroy({ where: { id: req.params.id } }).then((user) => {
    res.status(200).json({ user });
  }).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};
