var express = require('express');
var router = express.Router();
var admin = require('../controller/admin');

/* GET home page. */
router.post('/register',admin.addAdmin);
router.post('/',admin.login);
router.get('/logout',admin.logout);

module.exports = router;
