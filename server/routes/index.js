const express = require('express');

const users = require('../controllers/users');
const assets = require('../controllers/assets');
const sessions = require('../controllers/sessions');
const extras = require('../controllers/extras');

const router = express.Router();

/* Users */
router.post('/users', users.create);
router.get('/users', sessions.verify, users.read);
router.get('/users/:id', sessions.verify, users.read);
router.put('/users/:id', sessions.verify, users.update);
router.delete('/users/:id', sessions.verify, users.delete);

/* Assets */
router.post('/assets', sessions.verify, assets.create);
router.get('/assets', sessions.verify, assets.read);
router.get('/assets/:id', sessions.verify, assets.read);
router.put('/assets/:id', sessions.verify, assets.update);

/* Sessions */
router.post('/sessions', sessions.create);
router.get('/sessions', sessions.verify, sessions.read);

/* Misc */
router.post('/sendmail', extras.sendmail);

module.exports = router;
