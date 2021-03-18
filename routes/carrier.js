'use strict'

var express = require('express');
var CarrierController = require('../controllers/carrier');
var router = express.Router();
//var md_auth = require('../middlewares/authenticated');

router.post('/carriersData', CarrierController.dataTransaction);
router.post('/getData', CarrierController.getData);


module.exports = router;
