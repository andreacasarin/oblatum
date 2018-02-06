const orm = require('../models/index');

exports.create = (req, res, next, models = orm) => {
  models.User.create(req.body).then((user) => {
    res.json({ status: 'success', data: user });
  }).catch((error) => {
    res.json({ status: 'failure', data: error.errors });
  });
};

exports.read = (req, res, next, models = orm) => {
  if (req.params.id) {
    models.User.findById(req.params.id).then((user) => {
      res.json({ status: 'success', data: user });
    }).catch((error) => {
      res.json({ status: 'failure', data: error.errors });
    });
  } else {
    models.User.findAll().then((users) => {
      res.json({ status: 'success', data: users });
    }).catch((error) => {
      res.json({ status: 'failure', data: error.errors });
    });
  }
};

exports.update = (req, res, next, models = orm) => {
  models.User.update(req.body, { where: { id: req.params.id } }).then((user) => {
    res.json({ status: 'success', data: user });
  }).catch((error) => {
    res.json({ status: 'failure', data: error.errors });
  });
};

exports.delete = (req, res, next, models = orm) => {
  models.User.destroy({ where: { id: req.params.id } }).then((user) => {
    res.json({ status: 'success', data: user });
  }).catch((error) => {
    res.json({ status: 'failure', data: error.errors });
  });
};