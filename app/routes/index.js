const express = require('express');
const users = require('../controllers/users');
const misc = require('../controllers/misc');

const router = express.Router();

/* Express. */
// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'Express' });
// });

/* Users */
// router.post('/users/:userId', users.create);
// router.get('/users', users.read);
// router.get('/users/:userId', users.read);
// router.put('/users/:userId', users.update);
// router.delete('/users/:userId', users.delete);

/* Misc */
router.post('/sendmail', misc.sendmail);

module.exports = router;
