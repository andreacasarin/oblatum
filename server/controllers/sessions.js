const models = require('../models/index');
const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.create = (req, res, next, orm = models, jwt = jsonwebtoken) => {
  orm.User.findOne({
    where: {
      email: req.body.email,
    },
    include: [{
      association: orm.User.Wallets,
    }],
  }).then(user =>
    user.checkPassword(req.body.password).then((valid) => {
      if (!valid) throw new Error();
      const expire = Math.floor(Date.now() / 1000) + (60 * 60);
      const publicUser = user;
      publicUser.password = undefined;
      publicUser.passwordConfirmation = undefined;
      publicUser.Wallets[0].address = undefined;
      publicUser.Wallets[0].key = undefined;
      const token = jwt.sign({
        exp: expire,
        data: { user: publicUser },
      }, secret);
      res.status(200).json({ user: publicUser, token });
    }).catch((e) => {
      res.status(401).json({ errors: [{ message: 'Bad password' }] });
    })).catch(() => {
    res.status(401).json({ errors: [{ message: 'Bad user' }] });
  });
};

exports.read = (req, res, next) => {
  res.status(200).json({ user: req.tokenDecoded });
};

exports.verify = (req, res, next, jwt = jsonwebtoken) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    req.tokenDecoded = jwt.verify(token, secret);
    req.user = req.tokenDecoded.data.user;
    next();
  } catch (error) {
    res.status(403).json({ errors: [{ message: 'Forbidden' }] });
  }
};

