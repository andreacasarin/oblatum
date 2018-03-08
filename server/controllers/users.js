const models = require('../models/index');

exports.create = (req, res, next, orm = models) => {
  orm.User.create({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    passwordConfirmation: req.body.passwordConfirmation,
    Wallets: [{}],
  }, {
    include: [{
      association: orm.User.Wallets,
    }],
  }).then((user) => {
    res.status(200).json({ user });
  }).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};

exports.read = (req, res, next, orm = models) => {
  if (req.params.id) {
    orm.User.findById(req.params.id).then((user) => {
      res.status(200).json({ user });
    }).catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
  } else {
    orm.User.findAll().then((users) => {
      res.status(200).json({ users });
    }).catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
  }
};

exports.update = (req, res, next, orm = models) => {
  orm.User.update(req.body, { where: { id: req.params.id } }).then((user) => {
    res.status(200).json({ user });
  }).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};

exports.delete = (req, res, next, orm = models) => {
  orm.User.destroy({ where: { id: req.params.id } }).then((user) => {
    res.status(200).json({ user });
  }).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};
