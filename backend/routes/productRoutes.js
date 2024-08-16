const express = require('express');
const router = express.Router();
const productController = require('../controllers/productCtrl');

router.get('/get', productController.getProduct);

module.exports = router;
