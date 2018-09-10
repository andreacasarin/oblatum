const express = require('express');
const misc = require('../controllers/misc');

const router = express.Router();

/* Misc */
router.post('/sendmail', misc.sendmail);

module.exports = router;
