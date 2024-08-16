const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartCtrl');

router.post('/add', cartController.addItemToCart);
router.get('/get', cartController.getCart);

module.exports = router;
