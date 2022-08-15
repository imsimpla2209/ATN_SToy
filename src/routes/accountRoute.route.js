const accountController = require('../app/controllers/accountController');
const { authenticator } = require('../app/middlewares/Auth.middleware');

const express = require('express');
const router = express.Router();

router.post('/add', authenticator, accountController.create);

router.post('/login', accountController.login);

router.get('/add', authenticator, accountController.register);

router.get('/login', accountController.showLogin);

router.get('/', authenticator, accountController.show);

module.exports = router;