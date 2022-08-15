const productController = require('../app/controllers/productController');
const store = require('../app/middlewares/uploadByMulter');
const { authenticator } = require('../app/middlewares/Auth.middleware');
const express = require('express');
const router = express.Router();



router.post('/add', authenticator, store.array('images', 12), productController.uploadProduct);

router.put('/edit', authenticator, productController.update);

router.delete('/delete', authenticator, productController.delete);

router.get('/add', authenticator, productController.add);

router.get('/edit/:slug', authenticator, productController.showOne);

router.get('/:slug', authenticator, productController.show);

router.get('/', authenticator, productController.show);


module.exports = router;