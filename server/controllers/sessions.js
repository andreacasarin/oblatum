const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const expiration = Math.floor(Date.now() / 1000) + (60 * 60);

const createToken = ((user, jwt = jsonwebtoken, scrt = secret, expire = expiration) =>
  jwt.sign({
    exp: expire,
    data: { user },
  }, scrt)
);

const readToken = ((header, jwt = jsonwebtoken, scrt = secret) =>
  jwt.verify(header.split(' ')[1], scrt)
);

exports.create = (req, res, next, orm = models) => {
  orm.User
    .scope({ method: ['byEmail', req.body.email] })
    .findOne()
    .then(user =>
      user
        .checkPassword(req.body.password)
        .then((valid) => {
          if (!valid) throw new Error();
          res.status(200).json({ user, token: createToken(user) });
        })
        .catch(() => {
          res.status(401).json({ errors: [{ message: 'Bad credentials' }] });
        }))
    .catch(() => {
      res.status(401).json({ errors: [{ message: 'Bad credentials' }] });
    });
};

exports.read = (req, res) => {
  try {
    req.user = readToken(req.headers.authorization).data.user;
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(403).json({ errors: [{ message: 'Forbidden' }] });
  }
};

exports.verify = (req, res, next) => {
  try {
    req.user = readToken(req.headers.authorization).data.user;
    next();
  } catch (error) {
    res.status(403).json({ errors: [{ message: 'Forbidden' }] });
  }
};
