const orm = require('../models/index');

exports.create = (req, res, next, models = orm) => {
  models.User.findAll({
    where: {
      email: req.body.email,
    },
  }).then((users) => {
    if (users[0].checkPassword(req.body.password)) {
      res.status(200).json(users[0]);
    } else {
      res.status(401).json({ errors: ['Bad credentials'] });
    }
  }).catch((error) => {
    res.status(400).json({ errors: error.errors });
  });
};

