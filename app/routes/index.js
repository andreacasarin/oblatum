const express = require('express');
const users = require('../controllers/users');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* Users */
router.post('/users/:userId', users.create);
router.get('/users', users.read);
router.get('/users/:userId', users.read);
router.put('/users/:userId', users.update);
router.delete('/users/:userId', users.delete);

// E-mail sign-up landing page
router.post('/sendemail', (req, res) => {
  const email = req.body.email;
  /* Send email to @Alessandro */
  res.send(email);
});

module.exports = router;
