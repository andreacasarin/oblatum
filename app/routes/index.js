var express = require('express');
var router = express.Router();

var users = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Users */
router.post('/users/:userId', users.create);
router.get('/users', users.read);
router.get('/users/:userId', users.read);
router.put('/users/:userId', users.update);
router.delete('/users/:userId', users.delete);

module.exports = router;
