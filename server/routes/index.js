const express = require('express');

const users = require('../controllers/users');
const sessions = require('../controllers/sessions');
const extras = require('../controllers/extras');

const router = express.Router();

/* Users */
router.post('/users', users.create);
router.get('/users', users.read);
router.get('/users/:id', users.read);
router.put('/users/:id', sessions.verify, users.update);
router.delete('/users/:id', sessions.verify, users.delete);

/* Sessions */
router.post('/sessions', sessions.create);
router.get('/sessions', sessions.verify, sessions.read);

/* Misc */
router.post('/sendmail', extras.sendmail);

module.exports = router;
