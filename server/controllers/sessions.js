const orm = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.create = (req, res, next, models = orm, jwt = jsonwebtoken) => {
  models.User.findAll({
    where: {
      email: req.body.email,
    },
  }).then((users) => {
    if (users[0].checkPassword(req.body.password)) {
      const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: { user: users[0] },
      }, secret);
      res.status(200).json({ user: users[0], token });
    } else {
      res.status(401).json({ errors: [{ message: 'Bad credentials' }] });
    }
  }).catch(() => {
    res.status(401).json({ errors: [{ message: 'Bad credentials' }] });
  });
};

exports.read = (req, res, next) => {
  res.status(200).json({ user: req.tokenDecoded });
};

exports.verify = (req, res, next, jwt = jsonwebtoken) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);
    req.tokenDecoded = decoded;
    next();
  } catch (error) {
    res.status(403).json({ errors: [{ message: 'Forbidden' }] });
  }
};

