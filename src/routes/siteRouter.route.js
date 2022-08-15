const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');
const { authenticator } = require('../app/middlewares/Auth.middleware');



router.get('/logout', authenticator, siteController.logout);

router.get('/', authenticator, siteController.show);


module.exports = router;