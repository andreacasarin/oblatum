const express = require('express');

const users = require('../controllers/users');
const extras = require('../controllers/extras');

const router = express.Router();

/* Express. */
// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'Express' });
// });

/* Users */
router.post('/users', users.create);
router.get('/users', users.read);
router.get('/users/:id', users.read);
router.put('/users/:id', users.update);
router.delete('/users/:id', users.delete);

/* Misc */
router.post('/sendmail', extras.sendmail);

module.exports = router;
