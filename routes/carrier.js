'use strict'

var express = require('express');
var router = express.Router();
var CarrierController = require('../controllers/carrier');
//var md_auth = require('../middlewares/authenticated');

router.post('/carriersData', CarrierController.dataTransaction);
router.post('/dataOfCompany', CarrierController.dataOfCompany);
router.get('/getData', CarrierController.getData);
router.post('/getCompany', CarrierController.getCompany);
router.get('/getHistory', CarrierController.getHistory);

module.exports = router;
