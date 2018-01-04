const orm = require('../models/index');

exports.create = (req, res, next, models = orm) => {
  models.User.create(req.body).then((user) => {
    res.json(user);
  }).catch((error) => {
    res.json(error.errors);
  });
};

exports.read = (req, res, next, models = orm) => {
  if (req.params.id) {
    models.User.findById(req.params.id).then((user) => {
      res.json(user);
    }).catch((error) => {
      res.json(error.errors);
    });
  } else {
    models.User.findAll().then((users) => {
      res.json(users);
    }).catch((error) => {
      res.json(error.errors);
    });
  }
};

exports.update = (req, res, next, models = orm) => {
  models.User.update(req.body, { where: { id: req.params.id } }).then((user) => {
    res.json(user);
  }).catch((error) => {
    res.json(error.errors);
  });
};

exports.delete = (req, res, next, models = orm) => {
  models.User.destroy({ where: { id: req.params.id } }).then((user) => {
    res.json(user);
  }).catch((error) => {
    res.json(error.errors);
  });
};
