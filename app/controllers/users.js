const models = require('../models/index');

exports.create = (req, res) => {
  res.json('NOT IMPLEMENTED: User create');
};

exports.read = (req, res) => {
  if (req.params.userId) {
    models.User.findById(req.params.userId).then((user) => {
      res.json(user);
    });
  } else {
    models.User.findAll().then((users) => {
      res.json(users);
    });
  }
};

exports.update = (req, res) => {
  res.json('NOT IMPLEMENTED: User update');
};

exports.delete = (req, res) => {
  res.json('NOT IMPLEMENTED: User delete');
};
