const models = require('../models/index');
const mailer = require('../utils/mailer');

exports.create = (req, res, next, orm = models, mail = mailer) => {
  orm.User.create(req.body)
    .then((user) => {
      mail.send({
        from: '"Oblatum 👻" <support@oblatum.io>',
        to: user.email,
        subject: 'User created ✔',
        body: 'User ' +
          `${user.name} ` +
          'has been created in Oblatum. Log in on http://www.oblatum.io to see more!',
      });
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
};

exports.read = (req, res, next, orm = models) => {
  if (req.params.id) {
    orm.User
      .scope({ method: ['authorized', req.user.id] })
      .findById(req.params.id)
      .then((user) => {
        res.status(200).json({ user });
      }).catch((error) => {
        res.status(400).json({ errors: error.errors });
      });
  } else {
    orm.User
      .scope({ method: ['authorized', req.user.id] })
      .findAll()
      .then((users) => {
        res.status(200).json({ users });
      })
      .catch((error) => {
        res.status(400).json({ errors: error.errors });
      });
  }
};

exports.update = (req, res, next, orm = models) => {
  orm.User
    .scope({ method: ['authorized', req.user.id] })
    .update(req.body, { where: { id: req.params.id } })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
};

exports.delete = (req, res, next, orm = models) => {
  orm.User
    .scope({ method: ['authorized', req.user.id] })
    .destroy({ where: { id: req.params.id } })
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(400).json({ errors: error.errors });
    });
};
