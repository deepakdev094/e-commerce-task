const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminCtrl');

router.get('/discount', adminController.generateDiscountCode);
router.get('/stats', adminController.getStats);
router.get('/discountCodes', adminController.getDiscountCodes);

module.exports = router;
